import { Row, Col, Input } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';
import { useCallback } from 'react';
import useInput from '../hooks/useInput';

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

const StyledSearch = styled(Input.Search)`
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
            <StyledSearch placeholder="검색" />
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
