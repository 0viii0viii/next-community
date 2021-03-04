import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { Pagination } from 'antd';
import { END } from 'redux-saga';
import PostContainer from '../components/PostContainer';
import { LOAD_ME_REQUEST, POST_LOAD_REQUEST } from '../reducers/types';
import styled from 'styled-components';
import axios from 'axios';
import wrapper from '../store/configureStore';

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (page) => setCurrentPage(page);

  const Body = (
    <AppLayout>
      <PostContainer posts={currentPosts} />
      <StyledPagination
        total={Math.ceil((posts.length / postsPerPage) * 10)}
        onChange={paginate}
        current={currentPage}
      />
    </AppLayout>
  );
  return <>{posts ? Body : '게시글이 존재하지 않습니다'}</>;
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

    context.store.dispatch({
      type: LOAD_ME_REQUEST,
    });
    context.store.dispatch({
      type: POST_LOAD_REQUEST,
    });
    context.store.dispatch(END); //request를 보내고 성공을 받지못하고 종료되는것을 막아줌
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
