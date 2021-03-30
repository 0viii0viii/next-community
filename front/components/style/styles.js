import styled, { createGlobalStyle } from 'styled-components';
import { Form, Button, Input, Col, Row, Card } from 'antd';
import { MenuOutlined, FormOutlined } from '@ant-design/icons';
import img from '../../img/logo2.jpg';
import TextArea from 'antd/lib/input/TextArea';

// Login.js & Register.js
export const FormWrapper = styled(Form)`
  text-align: center;
  background: white;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  height: 100vh;
`;
export const Global = createGlobalStyle`
 body {
     background:#ebeef1;
     font-family: 'Roboto', sans-serif;
 }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
  background: primary;
  height: 50px;
  cursor: pointer;
`;

export const EmailFormWrapper = styled.div`
  display: flex;
  width: 100;
  margin-bottom: 20px;
  border-bottom: 1px solid #ebeef1;
`;

export const StyledInput = styled(Input)`
  margin-bottom: 20px;

  border-bottom: 1px solid #ebeef1;
`;

export const ErrorMessage = styled.div`
  color: red;
`;

export const RedirectCard = styled(Card)`
  text-align: center;
  justify-content: center;
`;

export const KakaoLogin = styled(Button)`
  background-color: yellow;
  width: 100%;
  border-radius: 5px;
`;

//SideMenu.js
export const Atag = styled.a`
  color: black;
  display: flex;
  margin-bottom: 10px;
  &: hover {
    background: #d9d9d9;
  }
`;
export const SideMenuWrapper = styled(Col)`
  width: 380px;
  position: ${(props) => props.position};
  top: 56px;
`;

export const SideMenuButton = styled(Button)`
  width: 100%;
  background: red;
  color: white;
  &:hover {
    background: yellow;
  }
`;

//HeaderBar.js
export const StyledHeaderBar = styled(Row)`
  height: 56px;
  background: #e72a2a;
  top: 0;
  display: flex;
  position: sticky;
  align-items: center;
  z-index: 1;
`;

export const HeaderMenu = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
`;
export const HeaderLogo = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

export const HeaderLoginButton = styled(Button)`
  float: right;
  margin-top: 0.25rem;
  &:hover {
    background: yellow;
  }
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;
export const HeaderLogoutButton = styled(Button)`
  margin-top: 7.5px;
  float: right;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

export const MenuLogout = styled(Button)`
  margin-bottom: 7.5px;
  margin-top: 7.5px;
  border: none;
  &:hover {
    color: red;
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
  &:hover {
    color: red;
  }
`;

export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  border: 1px solid #d9d9d9;
`;

export const StyledMenuItem = styled(MenuItem)`
  width: 100%;
  background: white;
  display: ${(props) => props.display};
`;

//HeaderBg.js

export const Background = styled.div`
  height: 200px;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-position: 50% 75%;
  background-size: cover;
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
export const CommentLength = styled.p`
  display: inline;
  color: blue;
`;

export const ImageContainer = styled.img`
  width: 50px;
  float: right;
`;

//Profile.js
export const BtnContainer = styled.div`
  margin-top: 10px;
`;

export const ProfileBtn = styled(Button)`
  width: 30%;
`;

//index.js
export const PaginationWrapper = styled.div`
  .paginate-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;

    margin-left: auto;
    margin-right: auto;
    width: 100%;
    border-radius: 3px;
    max-width: 100%;
    flex-wrap: wrap;
    background: white;
  }
  .paginate-a {
    color: black;
    &:hover {
      color: #1890ff;
    }
  }
  .paginate-li {
    padding: 0.5rem 1rem;
    border: 1px solid #d9d9d9;
    cursor: pointer;
    &:hover {
      border: 1px solid #1890ff;
    }
  }
  .paginate-next-a {
    padding: 0.5rem 1rem;
    border: 1px solid #d9d9d9;
    color: black;
    &:hover {
      border: 1px solid #1890ff;
      color: #1890ff;
    }
  }
  .paginate-prev-a {
    padding: 0.5rem 1rem;
    border: 1px solid #d9d9d9;
    color: black;
    &:hover {
      border: 1px solid #1890ff;
      color: #1890ff;
    }
  }
  .paginate-active {
    border: 1px solid #1890ff;

    color: #1890ff;
  }
`;

//PostContainer.js

export const PostContainerCard = styled(Card)`
  cursor: pointer;
  &:hover {
    background: #d9d9d9;
  }
`;
// Funcbar.js
export const FuncWrapper = styled.div`
  height: 50px;
  padding-top: 10px;
  width: 800px;
  border-bottom: 1px;
  background: white;
  position: ${(props) => props.position};
  z-index: 1;
  top: 56px;
`;

export const FuncWrapperTest = styled.div`
  width: 1200px;
  height: 50px;
  padding-top: 10px;
  border-bottom: 1px;
  background: white;
`;

export const StyledSearch = styled(Input.Search)`
  width: auto;
  margin-left: 20px;
`;

export const StyledPost = styled(FormOutlined)`
  font-size: 30px;
  color: blue;
  position: absolute;
  right: 0;
  margin-right: 10px;
  &:hover {
    background: yellow;
  }
`;

//CommentForm.js

export const NicknameText = styled.p`
  display: inline;
  font-weight: bold;
`;

export const DeleteBtn = styled(Button)`
  float: right;
  margin-bottom: 10px;
  &: hover {

  }
`;

export const CommentTtitle = styled(Col)`
  border-bottom: 1px solid #d9d9d9;
`;

export const CommentDate = styled.p`
  display: inline;
  color: gray;
`;
