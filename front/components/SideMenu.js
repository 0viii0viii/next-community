import { Button, Card, Col, Divider, Row } from 'antd';
import Link from 'next/link';
import Profile from './Profile';
import { useSelector } from 'react-redux';
import {
  Atag,
  SideMenuButton,
  SideMenuWrapper,
} from '../components/style/styles';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SideMenu = () => {
  const { me } = useSelector((state) => state.user);
  const [position, setPosition] = useState('static');
  useEffect(() => {
    function onScroll() {
      if (window.scrollY >= 200) {
        setPosition('fixed');
      } else {
        setPosition('static');
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll); /// return 부분이 없으면 메모리에 스크롤이 계속 쌓여있어서 필수
    };
  }, []);
  return (
    <>
      <Row>
        <SideMenuWrapper
          position={position}
          xs={0}
          sm={0}
          md={0}
          lg={0}
          xl={24}
        >
          {me ? (
            <Card>
              <Profile />
            </Card>
          ) : (
            <Card>
              <SideMenuButton>
                <Link href="/login">로그인</Link>
              </SideMenuButton>
            </Card>
          )}

          <Card title="커뮤니티" bordered={true}>
            <Link href="/?page=1">
              <Atag>전체 </Atag>
            </Link>
            <Divider />
            <Link href="/category/free">
              <Atag>자유 </Atag>
            </Link>
            <Link href="/category/humor">
              <Atag>유머 </Atag>
            </Link>
            <Divider />
            <Link href="/category/transfer">
              <Atag>이적 시장</Atag>
            </Link>
            <Link href="/category/forecast">
              <Atag>경기 예측</Atag>
            </Link>
            <Link href="/category/examine">
              <Atag>경기 분석</Atag>
            </Link>
            <Link href="/category/debate">
              <Atag>경기 토론</Atag>
            </Link>
          </Card>
        </SideMenuWrapper>
      </Row>
    </>
  );
};

export default SideMenu;
