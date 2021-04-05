import Logo from '../img/logo.png';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../reducers/types';
import styled from 'styled-components';
import {
  CloseOutlined,
  ContainerOutlined,
  FireOutlined,
  LoginOutlined,
  MenuOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
const HeaderBar = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [sidebar, setSidebar] = useState(false);
  const [display, setDisplay] = useState('');

  useEffect(() => {
    function onResize() {
      console.log(document.defaultView);
      if (window.innerWidth >= 1200) {
        setDisplay('none');
      } else {
        setDisplay('');
      }
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handleMenuClick = useCallback(() => {
    setSidebar(!sidebar);
  });

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, []);

  return (
    <>
      <StyledHeaderBar>
        <HeaderMenu xs={24}>
          <Link href="/">
            <HeaderLogo src={Logo} />
          </Link>
          {me ? (
            <HeaderLogoutButton onClick={onLogout}>로그아웃</HeaderLogoutButton>
          ) : (
            <HeaderLoginButton>
              <Link href="/login">로그인</Link>
            </HeaderLoginButton>
          )}
          <StyledMenuOutlined onClick={handleMenuClick} />
          <SidebarNav sidebar={sidebar} display={display}>
            <SidebarWrapper>
              <NavIcon>
                <CloseOutlined onClick={handleMenuClick} />
              </NavIcon>
              {me ? (
                <>
                  <Link href="/profile">
                    <SidebarLink>
                      <ProfileOutlined />
                      {me.nickname} 프로필
                    </SidebarLink>
                  </Link>
                  <Link href={`/myposts/${me.id}`}>
                    <SidebarLink>
                      <ContainerOutlined />내 게시글
                    </SidebarLink>
                  </Link>
                  <div onClick={onLogout}>
                    <SidebarLink>
                      <LoginOutlined />
                      로그아웃
                    </SidebarLink>
                  </div>
                </>
              ) : (
                <Link href="/login">
                  <SidebarLink>
                    <LoginOutlined />
                    로그인
                  </SidebarLink>
                </Link>
              )}
              <Link href="/?page=1">
                <SidebarLink>전체</SidebarLink>
              </Link>
              <Link href="/category/free">
                <SidebarLink>
                  <FireOutlined />
                  자유
                </SidebarLink>
              </Link>
              <Link href="/category/humor">
                <SidebarLink>
                  <FireOutlined />
                  유머
                </SidebarLink>
              </Link>
              <Link href="/category/transfer">
                <SidebarLink>
                  <FireOutlined />
                  이적 시장
                </SidebarLink>
              </Link>
              <Link href="/category/forecast">
                <SidebarLink>
                  <FireOutlined />
                  경기 예측
                </SidebarLink>
              </Link>
              <Link href="/category/examine">
                <SidebarLink>
                  <FireOutlined />
                  경기 분석
                </SidebarLink>
              </Link>
              <Link href="/category/debate">
                <SidebarLink>
                  <FireOutlined />
                  경기 토론
                </SidebarLink>
              </Link>
            </SidebarWrapper>
          </SidebarNav>
        </HeaderMenu>
      </StyledHeaderBar>
    </>
  );
};

const SidebarNav = styled.nav`
  background: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
  display: ${(props) => props.display};
  @media screen and (max-width: 1200px) {
    width: 500px;
  }
  @media screen and (max-width: 768px) {
    width: 400px;
  }
  @media screen and (max-width: 400px) {
    width: 200px;
  }
`;

const SidebarWrapper = styled.div`
  width: 100%;
`;
const NavIcon = styled.div`
  margin-right: 1rem;
  font-size: 1rem;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const SidebarLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 50px;
  text-decoration: none;
  color: black;
  font-size: 18px;
  border-bottom: 1px solid #d9d9d9;
  &:hover {
    background: #d9d9d9;
    border-left: 4px solid yellow;
    cursor: pointer;
  }
`;

const StyledHeaderBar = styled(Row)`
  height: 56px;
  background: #e72a2a;
  top: 0;
  display: flex;
  position: sticky;
  align-items: center;
  z-index: 1;
`;
const HeaderMenu = styled(Col)``;
const HeaderLogo = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  float: left;
`;
const HeaderLoginButton = styled(Button)`
  float: right;
  margin-top: 0.25rem;
  &:hover {
    background: yellow;
  }
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;
const HeaderLogoutButton = styled(Button)`
  margin-top: 7.5px;
  float: right;
  margin-right: 10px;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const StyledMenuOutlined = styled(MenuOutlined)`
  font-size: 30px;
  float: right;
  margin-top: 0.5rem;
  @media screen and (min-width: 1200px) {
    display: none;
  }
`;

export default HeaderBar;
