import { Card, Divider } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';

const StyledCard = styled(Card)``;

const Atag = styled.a`
  color: black;
  display: flex;
  margin-bottom: 10px;
`;

const SideMenu = () => {
  return (
    <>
      <StyledCard title="커뮤니티" bordered={true}>
        <Link href="/free">
          <Atag>자유 </Atag>
        </Link>
        <Link href="/humor">
          <Atag>유머 </Atag>
        </Link>
        <Divider />
        <Link href="/transfer">
          <Atag>이적 시장</Atag>
        </Link>
        <Link href="/forecast">
          <Atag>경기 예측</Atag>
        </Link>
        <Link href="/examine">
          <Atag>경기 분석</Atag>
        </Link>
        <Link href="/debate">
          <Atag>경기 토론</Atag>
        </Link>
      </StyledCard>
    </>
  );
};

export default SideMenu;
