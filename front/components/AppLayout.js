import React from 'react';
import Link from 'next/link';
import { PropTypes } from 'prop-types';
import { Button, Col, Menu, Row, Layout } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

import HeaderBg from './HeaderBg';
import SideMenu from './SideMenu';
import Funcbar from './FuncBar';

const Header = styled.header`
  background: blue;
  height: 56px;
`;

const StyledLink = styled(Link)`
  margin-top: 15px;
`;
const StyledButton = styled(Button)`
position
`;

const Global = createGlobalStyle`
 body {
     background:#ebeef1;
 }
`;

const AppLayout = ({ children }) => {
  return (
    <div>
      <Global />
      <Layout>
        <Header>
          <StyledLink href="/">
            <a>아스날</a>
          </StyledLink>
          <StyledButton>로그인</StyledButton>
        </Header>
      </Layout>

      <HeaderBg />
      <Row>
        <Col xs={0} sm={0} md={3}></Col>
        <Col xs={0} sm={5} md={5}>
          <SideMenu />
        </Col>
        <Col xs={24} sm={19} md={10}>
          <Funcbar />

          <Menu mode="horizontal">
            <Menu.Item>
              <Link href="/popular">
                <a>인기</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/latest">
                <a>최신</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/respect">
                <a>축잘</a>
              </Link>
            </Menu.Item>
          </Menu>

          {children}
        </Col>
        <Col sm={0} md={6}></Col>
      </Row>
    </div>
  );
};

AppLayout.propType = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
