import { Button, Col, Input, Row } from 'antd';
import Form from 'antd/lib/form/Form';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { EMAIL_AUTH_REQUEST, REGISTER_REQUEST } from '../reducers/types';
import styled, { createGlobalStyle } from 'styled-components';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const {
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

  return (
    <>
      <Global />
      <Row>
        <Col flex="auto"></Col>
        <Col xs={24} sm={24} md={24}>
          <FormWrapper onFinish={onSubmit}>
            <h1>회원가입</h1>
            <Link href="/">
              <h3>홈으로 가기</h3>
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
  );
};

const FormWrapper = styled(Form)`
  text-align: center;
  background: white;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  @media screen and (max-height: 568px) {
    // iphone SE
    margin-top: 35vh;
  }
  @media screen and (max-height: 812px) {
    // iphone X
    margin-top: 38vh;
  }
  @media screen and (max-height: 1366px) {
    //ipad pro
    margin-top: 30vh;
  }
`;
const Global = createGlobalStyle`
 body {
     background: white;
     font-family: 'Roboto', sans-serif;
 }
`;

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
  background: primary;
  height: 50px;
  cursor: pointer;
`;

const EmailFormWrapper = styled.div`
  display: flex;
  width: 100;
  margin-bottom: 20px;
  border-bottom: 1px solid #ebeef1;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;

  border-bottom: 1px solid #ebeef1;
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default RegisterForm;
