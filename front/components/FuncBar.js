import { Row, Col } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import { useCallback } from 'react';
import useInput from '../hooks/useInput';
import {
  FuncWrapper,
  FuncWrapperTest,
  StyledPost,
  StyledSearch,
} from '../components/style/styles';

const Funcbar = () => {
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/search/${searchInput}`);
  });
  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={0} lg={0} xl={24}>
          <FuncWrapper>
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
