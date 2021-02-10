import { Button, Card, Col, Divider, Row } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import Profile from './Profile';
import { useSelector } from 'react-redux';

const StyledCard = styled(Card)``;

const Atag = styled.a`
  color: black;
  display: flex;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background: red;
  color: white;
`;

const SideMenu = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={0} lg={0} xl={24}>
          {me ? (
            <Card>
              <Profile />
            </Card>
          ) : (
            <Card>
              <StyledButton>
                <Link href="/login">로그인</Link>
              </StyledButton>
            </Card>
          )}

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
        </Col>
      </Row>
    </>
  );
};

export default SideMenu;
