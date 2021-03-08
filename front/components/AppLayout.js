import { PropTypes } from 'prop-types';
import { Col, Row } from 'antd';
import HeaderBg from './HeaderBg';
import SideMenu from './SideMenu';
import Funcbar from './FuncBar';

import HeaderBar from './HeaderBar';
import { Global } from './style/styles';

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
        <Col flex="380px">
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
