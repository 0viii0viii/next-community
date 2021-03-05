import { Col, Row } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { LOGIN_REQUEST } from '../reducers/types';
import {
  FormWrapper,
  Global,
  StyledButton,
  StyledInput,
} from '../components/style/styles';

const login = () => {
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
        <Col xs={24} sm={24} md={6}>
          <FormWrapper onFinish={onSubmitLogin}>
            <Link href="/">
              <h1>Gunners</h1>
            </Link>

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

export default login;
