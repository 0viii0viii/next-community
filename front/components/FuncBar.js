import { Row, Col } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Search from 'antd/lib/input/Search';

const FuncWrapper = styled.div`
  height: 50px;
  padding-top: 10px;
  border-bottom: 1px;
  background: white;
`;

const FuncWrapperTest = styled.div`
  width: 1200px;
  height: 50px;
  padding-top: 10px;
  border-bottom: 1px;
  background: white;
`;

const StyledSearch = styled(Search)`
  width: 430px;
  margin-left: 20px;
`;

const StyledPost = styled(FormOutlined)`
  font-size: 30px;
  color: blue;
  position: absolute;
  right: 0;
  margin-right: 10px;
`;

const Funcbar = () => {
  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={0} lg={0} xl={24}>
          <FuncWrapper>
            <StyledSearch placeholder="검색" />
            <StyledPost />
          </FuncWrapper>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={0}>
          <FuncWrapperTest>
            <StyledSearch placeholder="검색" />
            <StyledPost />
          </FuncWrapperTest>
        </Col>
      </Row>
    </>
  );
};

export default Funcbar;
