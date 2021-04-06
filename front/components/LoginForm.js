import { Button, Col, Input, Row, Form, Divider } from 'antd';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import styled, { createGlobalStyle } from 'styled-components';
import { LOGIN_REQUEST } from '../reducers/types';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginLoading, loginError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

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
  height: 100vh;
`;
const Global = createGlobalStyle`
 body {
     background:#ebeef1;
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

const StyledInput = styled(Input)`
  margin-bottom: 20px;

  border-bottom: 1px solid #ebeef1;
`;

const KakaoLogin = styled(Button)`
  background-color: yellow;
  width: 100%;
  border-radius: 5px;
`;

export default LoginForm;
