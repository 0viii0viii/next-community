import {
  StyledHeaderBar,
  HeaderMenu,
  HeaderLoginButton,
  HeaderLogoutButton,
  StyledMenuOutlined,
  HeaderLogo,
} from '../components/style/styles';
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
  ProfileOutlined,
} from '@ant-design/icons';
const HeaderBar = () => {
  const dispatch = useDispatch();
  const { me, logoutDone } = useSelector((state) => state.user);
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

  useEffect(() => {
    if (logoutDone) {
      setSidebar(!sidebar);
    }
  }, [logoutDone]);

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
                      프로필
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
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
  display: ${(props) => props.display};
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

export default HeaderBar;
