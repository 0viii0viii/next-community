import { PropTypes } from 'prop-types';
import { Col, Row } from 'antd';
import HeaderBg from './HeaderBg';
import SideMenu from './SideMenu';
import Funcbar from './FuncBar';
import HeaderBar from './HeaderBar';
import { Global } from './style/styles';
import { useEffect, useState } from 'react';

const AppLayout = ({ children }) => {
  const [width, setWidth] = useState('800px');
  useEffect(() => {
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
    };
  }, []);
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
        <Col flex="380px">
          <SideMenu />
        </Col>
        <Col flex={width}>
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
