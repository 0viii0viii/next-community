import {
  StyledHeaderBar,
  HeaderMenu,
  HeaderA,
  HeaderLoginButton,
  HeaderLogoutButton,
  StyledMenuOutlined,
  StyledMenuItem,
  Atag2,
  StyledCol,
  MenuLogout,
  HeaderLogo,
} from '../components/style/styles';
import Logo from '../img/logo.png';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../reducers/types';
import { Row } from 'antd';
const HeaderBar = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [menuOpened, setmenuOpened] = useState(false);
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
    setmenuOpened((prev) => !prev);
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
        </HeaderMenu>
      </StyledHeaderBar>
      {menuOpened && (
        <Row>
          <StyledMenuItem display={display}>
            {me ? (
              <>
                <StyledCol xs={24} lg={24} xl={0}>
                  <Link href="/profile">
                    <Atag2>내 프로필</Atag2>
                  </Link>
                </StyledCol>
                <StyledCol xs={24} lg={24} xl={0}>
                  <Link href={`/myposts/${me.id}`}>
                    <Atag2>내 게시글</Atag2>
                  </Link>
                </StyledCol>
                <StyledCol xs={24} lg={24} xl={0}>
                  <MenuLogout onClick={onLogout}>
                    <Atag2>로그아웃</Atag2>
                  </MenuLogout>
                </StyledCol>
              </>
            ) : (
              <StyledCol xs={24} lg={24} xl={0}>
                <Link href="/login">
                  <Atag2>로그인</Atag2>
                </Link>
              </StyledCol>
            )}
            <StyledCol xs={24} lg={24} xl={0}>
              <Link href="/category/free">
                <Atag2>자유</Atag2>
              </Link>
              <Link href="/category/humor">
                <Atag2>유머</Atag2>
              </Link>
              <Link href="/category/transfer">
                <Atag2>이적 시장</Atag2>
              </Link>
              <Link href="/category/forecast">
                <Atag2>경기 예측</Atag2>
              </Link>
              <Link href="/category/examine">
                <Atag2>경기 분석</Atag2>
              </Link>
              <Link href="/category/debate">
                <Atag2>경기 토론</Atag2>
              </Link>
            </StyledCol>
          </StyledMenuItem>
        </Row>
      )}
    </>
  );
};

export default HeaderBar;
