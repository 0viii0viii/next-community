import { Card } from 'antd';
import styled from 'styled-components';

const ListWrapper = styled.div`
  margin-left: 350px;
`;

const SideMenu = () => {
  return (
    <ListWrapper>
      <Card title="커뮤니티" bordered={true}>
        <p>자유</p>
        <p>유머</p>
        <p>전략</p>
        <p>분석</p>
        <p>경기예측</p>
        <p>전략</p>
      </Card>
    </ListWrapper>
  );
};

export default SideMenu;
