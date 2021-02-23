import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  CATEGORY_POST_LOAD_REQUEST,
  LOAD_ME_REQUEST,
} from '../../reducers/types';
//SSR
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import { Pagination } from 'antd';
import styled from 'styled-components';

import Link from 'next/link';
import { Card } from 'antd';
import moment from 'moment';
import PostContainer from '../../components/PostContainer';

moment.locale('ko');

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const Category = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { categoryLoadPosts } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = categoryLoadPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginate = (page) => setCurrentPage(page);
  return (
    <>
      <AppLayout>
        <PostContainer posts={currentPosts} />
        <StyledPagination
          total={Math.ceil((categoryLoadPosts.length / postsPerPage) * 10)}
          onChange={paginate}
          current={currentPage}
        />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // cookie front -> backend 공유
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      // 쿠키를 지웠다가 넣었다가 해야 쿠키가 다른사용자와 공유가되지않음
      axios.defaults.headers.Cookie = cookie;
    }
    //결과를 reducer의 hydrate로 보냄
    context.store.dispatch({
      type: LOAD_ME_REQUEST,
    });
    context.store.dispatch({
      type: CATEGORY_POST_LOAD_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END); //request를 보내고 성공을 받지못하고 종료되는것을 막아줌
    await context.store.sagaTask.toPromise();
  }
);

export default Category;
