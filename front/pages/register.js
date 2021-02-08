import { Button, Col, Divider, Input, Row } from 'antd';
import Form from 'antd/lib/form/Form';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import useInput from '../hooks/useInput';

const FormWrapper = styled(Form)`
  text-align: center;
  background: white;
  padding-left: 20px;
  padding-right: 20px;
  width: 500px;
  height: 100vh;
`;
const Global = createGlobalStyle`
 body {
     background:#ebeef1;
 }
`;

const StyledButton3 = styled(Button)`
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
  background: #ebeef1;

  height: 50px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;

  border-bottom: 1px solid #ebeef1;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const register = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  return (
    <>
      <Global />
      <Row>
        <Col flex="auto"></Col>
        <Col xs={24} sm={24} md={6}>
          <FormWrapper>
            <Link href="/">
              <h1>Gunners</h1>
            </Link>

            <StyledInput
              name="user-email"
              type="email"
              value={email}
              onChange={onChangeEmail}
              required
              bordered={false}
              placeholder="이메일"
            />
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
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
            )}
            <StyledButton3>가입하기</StyledButton3>

            <p>이미 회원이신가요?</p>
            <Link href="/login">로그인하기</Link>
          </FormWrapper>
        </Col>
        <Col flex="auto"></Col>
      </Row>
    </>
  );
};

export default register;
