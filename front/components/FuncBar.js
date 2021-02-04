import { Row, Col } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Search from 'antd/lib/input/Search';

const FuncWrapper = styled.div`
  height: 30px;
  padding-top: 10px;
  margin-bottom: 10px;
  & p {
    margin-left: 20px;
  }
`;

const Funcbar = () => {
  return (
    <FuncWrapper>
      <Row>
        <Col xs={24} md={14}>
          <p> 전체 </p>
        </Col>
        <Col xs={0} md={6}>
          <Search placeholder="검색" />
        </Col>
        <Col xs={0} md={4}>
          <FormOutlined />
        </Col>
      </Row>
    </FuncWrapper>
  );
};

export default Funcbar;
