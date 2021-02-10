import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { PropTypes } from 'prop-types';
import { Button, Col, Menu, Row, Layout, Card } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

import HeaderBg from './HeaderBg';
import SideMenu from './SideMenu';
import Funcbar from './FuncBar';
import MainMenu from './MainMenu';
import { MenuOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Header = styled.header`
  background: blue;
  height: 56px;
`;

const StyledLink = styled(Link)`
  margin-top: 15px;
`;
const StyledButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 15px;
`;

const StyledMenuOutlined = styled(MenuOutlined)`
  font-size: 30px;
  position: absolute;
  right: 0;
  margin-top: 10px;
`;

const StyledItem = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  background: white;
`;
const Atag = styled.a`
  color: black;
  display: flex;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Global = createGlobalStyle`
 body {
     background:#ebeef1;
 }
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [menuOpened, setmenuOpened] = useState(false);

  const handleMenuClick = useCallback(() => {
    setmenuOpened((prev) => !prev);
  });

  return (
    <div>
      <Global />

      <Header>
        <Row>
          <Col xs={0} md={4}></Col>
          <Col xs={12} md={7}>
            {/* <StyledLink href="/">
              <a>아스날</a>
            </StyledLink> */}
          </Col>
          <Col xs={12} md={0}>
            <StyledMenuOutlined onClick={handleMenuClick} />
          </Col>
          <Col xs={0} md={8}>
            {/* <StyledButton>로그인</StyledButton> */}
          </Col>
          <Col xs={0} md={4}></Col>
        </Row>
      </Header>

      {menuOpened && (
        <Row>
          <Col xs={24} md={0}>
            {me ? (
              <StyledItem>
                <Link href="/profile">
                  <Atag>{me.nickname}내 프로필</Atag>
                </Link>
              </StyledItem>
            ) : (
              <StyledItem>
                <Link href="/login">
                  <Atag>로그인</Atag>
                </Link>
              </StyledItem>
            )}
          </Col>
          <Col xs={24} md={0}>
            <StyledItem>
              <Link href="/free">
                <Atag>자유</Atag>
              </Link>
              <Link href="/humor">
                <Atag>유머</Atag>
              </Link>
              <Link href="/transfer">
                <Atag>이적시장</Atag>
              </Link>
              <Link href="/forecast">
                <Atag>경기 예측</Atag>
              </Link>
              <Link href="/examine">
                <Atag>경기 분석</Atag>
              </Link>
              <Link href="/debate">
                <Atag>경기 토론</Atag>
              </Link>
            </StyledItem>
          </Col>
        </Row>
      )}
      <Row>
        <Col xs={0} md={24}>
          <HeaderBg />
        </Col>
      </Row>
      <Row>
        <Col flex="auto"></Col>
        <Col flex="400px">
          <SideMenu />
        </Col>
        <Col flex="800px">
          <Funcbar />
          <MainMenu />
          {children}
        </Col>
        <Col flex="auto"></Col>
      </Row>
    </div>
  );
};

AppLayout.propType = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
