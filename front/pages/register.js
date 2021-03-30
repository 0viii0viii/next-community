import { Button, Card, Col, Input, Row } from 'antd';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {
  EMAIL_AUTH_REQUEST,
  LOAD_ME_REQUEST,
  REGISTER_REQUEST,
} from '../reducers/types';
import {
  FormWrapper,
  Global,
  StyledInput,
  StyledButton,
  ErrorMessage,
  RedirectCard,
  EmailFormWrapper,
} from '../components/style/styles';
import { useRouter } from 'next/router';
//SSR
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';

const register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    me,
    registerLoading,
    registerError,
    emailAuthLoading,
    emailAuthDone,
    emailAuthNum,
    emailAuthError,
  } = useSelector((state) => state.user);
  //에러가 있을경우
  useEffect(() => {
    if (registerError) {
      alert(registerError);
    }
  }, [registerError]);

  useEffect(() => {
    if (emailAuthError) {
      alert(emailAuthError);
    }
  }, [emailAuthError]);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [authNum, onChangeAuthNum] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    // password 일치 여부확인
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      //password가 다르면 error
      return setPasswordError(true);
    }
    if (authNum != emailAuthNum) {
      return alert('인증번호가 일치하지 않습니다.');
    }
    dispatch({
      type: REGISTER_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck]);

  const onEmailAuth = useCallback(() => {
    if (!email) {
      alert('이메일을 입력해주십시오.');
    } else {
      dispatch({
        type: EMAIL_AUTH_REQUEST,
        data: { email },
      });
    }
  });

  return (
    <>
      {me ? (
        <>
          <AppLayout>
            <RedirectCard>
              <h1> Arsenal</h1>
              <p>이미 가입하신 회원입니다.</p>
              <Button onClick={() => router.replace('/')}> 확인</Button>
            </RedirectCard>
          </AppLayout>
        </>
      ) : (
        <>
          <Global />
          <Row>
            <Col flex="auto"></Col>
            <Col xs={24} sm={24} md={24}>
              <FormWrapper onFinish={onSubmit}>
                <Link href="/">
                  <h1>Gunners</h1>
                </Link>

                <EmailFormWrapper>
                  <Input
                    name="user-email"
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    required
                    bordered={false}
                    placeholder="이메일"
                  />
                  {!emailAuthDone ? (
                    <Button onClick={onEmailAuth} loading={emailAuthLoading}>
                      인증
                    </Button>
                  ) : (
                    <Button>전송됨</Button>
                  )}
                </EmailFormWrapper>
                {emailAuthDone ? (
                  <StyledInput
                    value={authNum}
                    onChange={onChangeAuthNum}
                    bordered={false}
                    placeholder="인증번호"
                  />
                ) : (
                  ''
                )}

                <StyledInput
                  name="user-nickname"
                  value={nickname}
                  onChange={onChangeNickname}
                  required
                  bordered={false}
                  placeholder="닉네임"
                />
                <StyledInput
                  name="user-password"
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                  required
                  bordered={false}
                  placeholder="비밀번호"
                />
                <StyledInput
                  name="user-password-check"
                  type="password"
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                  required
                  bordered={false}
                  placeholder="비밀번호 확인"
                />
                {passwordError && ( //passwordError가 존재하면 ErrorMessage
                  <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
                )}
                <StyledButton
                  type="primary"
                  htmlType="submit"
                  loading={registerLoading}
                >
                  가입하기
                </StyledButton>

                <p>이미 회원이신가요?</p>
                <Link href="/login">로그인하기</Link>
              </FormWrapper>
            </Col>
            <Col flex="auto"></Col>
          </Row>
        </>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // cookie front -> backend 공유
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      // 쿠키를 지웠다가 넣었다가 해야 쿠키가 다른사용자와 공유가되지않음
      axios.defaults.headers.Cookie = cookie;
    }
    //결과를 reducer의 hydrate로 보냄
    context.store.dispatch({
      type: LOAD_ME_REQUEST,
    });
    context.store.dispatch(END); //request를 보내고 성공을 받지못하고 종료되는것을 막아줌
    await context.store.sagaTask.toPromise();
  }
);
export default register;
