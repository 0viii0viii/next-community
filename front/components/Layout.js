import React from 'react';
import Link from 'next/link';
import { PropTypes } from 'prop-types';
import { Col, Menu, Row } from 'antd';
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

const Global = createGlobalStyle`
 body {
     background:#ebeef1;
 }
`;

const Layout = ({ children }) => {
  return (
    <div>
      <Global />
      <Header>
        <Row>
          <Col md={5}></Col>
          <Col xs={24} md={14}>
            <StyledLink href="/">
              <a>아스날</a>
            </StyledLink>
          </Col>
          <Col md={5}></Col>
        </Row>
      </Header>
      <HeaderBg />
      <Row>
        <Col xs={0} md={8}>
          <SideMenu />
        </Col>
        <Col xs={24} md={10}>
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
        <Col md={6}></Col>
      </Row>
    </div>
  );
};

Layout.propType = {
  children: PropTypes.node.isRequired,
};

export default Layout;
