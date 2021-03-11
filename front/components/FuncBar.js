import { Row, Col } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import {
  FuncWrapper,
  FuncWrapperTest,
  StyledPost,
  StyledSearch,
} from '../components/style/styles';

const Funcbar = () => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const [position, setPosition] = useState('static');
  //scorll
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

  const onSearch = useCallback(() => {
    Router.push(`/search/${searchInput}`);
  });

  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={0} lg={0} xl={24}>
          <FuncWrapper position={position}>
            <StyledSearch
              enterButton
              value={searchInput}
              onChange={onChangeSearchInput}
              onSearch={onSearch}
            />
            <Link href="/post">
              <StyledPost />
            </Link>
          </FuncWrapper>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={0}>
          <FuncWrapperTest>
            <StyledSearch
              enterButton
              value={searchInput}
              onChange={onChangeSearchInput}
              onSearch={onSearch}
            />
            <Link href="/post">
              <StyledPost />
            </Link>
          </FuncWrapperTest>
        </Col>
      </Row>
    </>
  );
};

export default Funcbar;
