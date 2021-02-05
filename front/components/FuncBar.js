import { Row, Col } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Search from 'antd/lib/input/Search';

const FuncWrapper = styled.div`
  height: 30px;
  padding-top: 10px;
  border-bottom: 1px;
  background: white;
`;

const StyledSearch = styled(Search)`
  width: 200px;
  margin-left: 20px;
`;

const StyledPost = styled(FormOutlined)`
  font-size: 30px;
  color: blue;
`;

const Funcbar = () => {
  return (
    <FuncWrapper>
      <StyledSearch placeholder="검색" />
      <StyledPost />
    </FuncWrapper>
  );
};

export default Funcbar;
