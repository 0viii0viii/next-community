import { Button, Card, Col, Divider, Row } from 'antd';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { LOAD_ME_REQUEST, LOGIN_REQUEST } from '../reducers/types';
import AppLayout from '../components/AppLayout';
import {
  FormWrapper,
  Global,
  StyledButton,
  StyledInput,
  RedirectCard,
  KakaoLogin,
} from '../components/style/styles';
//SSR
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
const login = () => {
  const dispatch = useDispatch();
  const { me, loginLoading, loginError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const router = useRouter();
  //로그인 오류시 오류 알림
  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  const onSubmitLogin = useCallback(() => {
    dispatch({
      type: LOGIN_REQUEST,
      data: { email, password },
    });
  }, [email, password]);

  return (
    <>
      {me ? (
        <>
          <AppLayout>
            <RedirectCard>
              <h1> Arsenal</h1>
              <p>이미 로그인되어있습니다.</p>
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
              <FormWrapper onFinish={onSubmitLogin}>
                <Link href="/">
                  <h1>Gunners</h1>
                </Link>
                <KakaoLogin href="http://localhost:5000/auth/kakao">
                  카카오톡으로 로그인
                </KakaoLogin>
                <Divider>Or</Divider>
                <h3>이메일로 로그인</h3>
                <StyledInput
                  type="email"
                  value={email}
                  onChange={onChangeEmail}
                  bordered={false}
                  placeholder="이메일"
                />
                <StyledInput
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                  bordered={false}
                  placeholder="비밀번호"
                />
                <StyledButton
                  type="primary"
                  htmlType="submit"
                  loading={loginLoading}
                >
                  로그인
                </StyledButton>

                <p>아직 회원이 아니신가요?</p>
                <Link href="/register">회원가입하기</Link>
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
export default login;
