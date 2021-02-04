import React from 'react';
import { PropTypes } from 'prop-types';
import { Col, Menu, Row } from 'antd';
import styled from 'styled-components';
import HeaderBg from './HeaderBg';

import SideMenu from './SideMenu';
import Funcbar from './FuncBar';

const Header = styled.header`
  background: red;
  height: 56px;
`;

const MenuWrapper = styled.div`
  background: #f00000;
`;

const Layout = ({ children }) => {
  return (
    <div>
      <Header>
        <Row>
          <Col md={5}></Col>
          <Col xs={24} md={14}></Col>
          <Col md={5}></Col>
        </Row>
      </Header>
      <HeaderBg />
      <Row>
        <Col xs={0} md={8}>
          <SideMenu />
        </Col>
        <Col xs={24} md={10}>
          <MenuWrapper>
            <Funcbar />
            <Menu
              mode="horizontal"
              style={{ backgroundColor: '#f00000', color: 'white' }}
            >
              <Menu.Item>인기</Menu.Item>
              <Menu.Item>최신</Menu.Item>
              <Menu.Item>축잘</Menu.Item>
            </Menu>
          </MenuWrapper>
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
