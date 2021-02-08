import { Button, Col, Divider, Input, Row } from 'antd';
import Form from 'antd/lib/form/Form';
import Link from 'next/link';
import styled, { createGlobalStyle } from 'styled-components';

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

const StyledButton1 = styled(Button)`
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
  background: white;
  height: 50px;
`;
const StyledButton2 = styled(Button)`
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
  background: yellow;

  height: 50px;
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

const login = () => {
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
            <StyledButton1>구글로 로그인</StyledButton1>
            <br />
            <StyledButton2>카카오톡으로 로그인</StyledButton2>
            <Divider>OR</Divider>
            <h3>이메일로 로그인</h3>
            <StyledInput bordered={false} placeholder="이메일" />
            <StyledInput bordered={false} placeholder="비밀번호" />
            <StyledButton3>로그인</StyledButton3>

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
