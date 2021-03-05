import styled, { createGlobalStyle } from 'styled-components';
import { Form, Button, Input } from 'antd';

export const FormWrapper = styled(Form)`
  text-align: center;
  background: white;
  padding-left: 20px;
  padding-right: 20px;
  width: 500px;
  height: 100vh;
`;
export const Global = createGlobalStyle`
 body {
     background:#ebeef1;
 }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
  background: primary;
  height: 50px;
`;

export const StyledInput = styled(Input)`
  margin-bottom: 20px;

  border-bottom: 1px solid #ebeef1;
`;

export const ErrorMessage = styled.div`
  color: red;
`;
