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

const register = () => {
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

            <StyledInput bordered={false} placeholder="이메일" />
            <StyledInput bordered={false} placeholder="닉네임" />
            <StyledInput bordered={false} placeholder="비밀번호" />
            <StyledInput bordered={false} placeholder="비밀번호 확인" />
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
