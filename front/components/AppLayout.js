import { Col, Row } from 'antd';
import HeaderBg from './HeaderBg';
import SideMenu from './SideMenu';
import Funcbar from './FuncBar';
import HeaderBar from './HeaderBar';
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

const AppLayout = ({ children }) => {
  const [width, setWidth] = useState('800px');

  useEffect(() => {
    // 윈도우 창 가로 크기에 따라 게시물섹션 width 설정
    function onResize() {
      if (window.innerWidth >= 1200) {
        setWidth('800px');
      } else {
        setWidth('100%');
      }
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      // event가 메모리에 쌓이지 않도록(성능)
    };
  }, []);

  return (
    <>
      <Global />
      <HeaderBar />
      <Row>
        <Col xs={0} lg={0} xl={24}>
          <HeaderBg />
        </Col>
      </Row>
      <Row>
        <Col flex="auto"></Col>
        <Col flex="380px">
          <SideMenu />
        </Col>
        <Col flex={width}>
          <Funcbar />
          {children}
        </Col>
        <Col flex="auto"></Col>
      </Row>
    </>
  );
};

const Global = createGlobalStyle`
 body {
     background:#ebeef1;
     font-family: 'Roboto', sans-serif;
 }
`;

export default AppLayout;
