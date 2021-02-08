import styled from 'styled-components';
import Link from 'next/link';
import { Col, Menu, Row } from 'antd';

const StyledMenu = styled(Menu)``;

const MainMenu = () => {
  return (
    <>
      <StyledMenu mode="horizontal">
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
      </StyledMenu>
    </>
  );
};

export default MainMenu;
