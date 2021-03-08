import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { PropTypes } from 'prop-types';
import { Button, Col, Menu, Row, Layout, Card } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

import HeaderBg from './HeaderBg';
import SideMenu from './SideMenu';
import Funcbar from './FuncBar';
import { MenuOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import HeaderBar from './HeaderBar';

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
  return (
    <div>
      <Global />
      <HeaderBar />
      <Row>
        <Col xs={0} lg={0} xl={24}>
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
