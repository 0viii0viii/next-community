import styled, { createGlobalStyle } from 'styled-components';
import { Form, Button, Input, Col, Row } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
// Login.js & Register.js
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
//SideMenu.js
export const Atag = styled.a`
  color: black;
  display: flex;
  margin-bottom: 10px;
`;

export const SideMenuButton = styled(Button)`
  width: 100%;
  background: red;
  color: white;
`;

export const SideMenuWrapper = styled(Col)`
  --offset: 2rem;
  flex-grow: 1;
  flex-basis: 300px;
  align-self: start;
  position: sticky;
  top: var(--offset);
`;

//HeaderBar.js
export const StyledHeaderBar = styled(Row)`
  height: 56px;
  background: red;
  top: 0;
  display: flex;
  align-items: center;
`;

export const HeaderMenu = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
`;
export const HeaderLink = styled(Link)``;

export const HeaderLoginButton = styled(Button)`
  float: right;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;
export const HeaderLogoutButton = styled(Button)`
  float: right;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

export const StyledMenuOutlined = styled(MenuOutlined)`
  font-size: 30px;
  float: right;

  @media screen and (min-width: 1200px) {
    display: none;
  }
`;

export const MenuItem = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

export const Atag2 = styled.a`
  color: black;
  padding: 15px;
  margin-top: 10px;
`;

export const StyledCol = styled(Col)`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
`;

//HeaderBg.js

export const Background = styled.div`
  height: 200px;
  background: white;
  text-align: center;
  font-size: 50px;
`;

//PostContainer.js

export const PostDetail = styled.div`
  margin-top: 5px;
`;

export const P = styled.p`
  display: inline;
  padding: 10px;
  color: gray;
`;
