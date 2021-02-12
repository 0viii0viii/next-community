import styled from 'styled-components';
import Link from 'next/link';
import { Col, Menu, Row } from 'antd';

const StyledMenuTest = styled(Menu)`
  width: 100%;
`;

const MainMenu = () => {
  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={0} lg={0} xl={24}>
          <Menu mode="horizontal">
            <Menu.Item>
              <Link href="/popular">
                <a>인기</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/latest">
                <a>최신</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/respect">
                <a>축잘</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={0}>
          <StyledMenuTest mode="horizontal">
            <Menu.Item>
              <Link href="/popular">
                <a>인기</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/latest">
                <a>최신</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/respect">
                <a>축잘</a>
              </Link>
            </Menu.Item>
          </StyledMenuTest>
        </Col>
      </Row>
    </>
  );
};

export default MainMenu;
