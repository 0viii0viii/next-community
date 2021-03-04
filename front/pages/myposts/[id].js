import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//SSR
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
//Style
import { Card, Pagination } from 'antd';
import styled from 'styled-components';

import PostContainer from '../../components/PostContainer';
import AppLayout from '../../components/AppLayout';
import { LOAD_ME_REQUEST } from '../../reducers/types';
import useSWR from 'swr';

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Myposts = (props) => {
  const dispatch = useDispatch();

  // const { myposts, mypostLoadLoading } = useSelector((state) => state.post);
  const initialData = props.data;
  const { data, error } = useSWR('/post/myposts/:id', fetcher, { initialData });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (page) => setCurrentPage(page);

  if (error) {
    console.error(error);
    return '게시글 로딩 중 에러가 발생했습니다.';
  }
  return (
    <>
      <AppLayout>
        <Card>
          <h2>{data[1].creator}</h2>님의 게시글 {data.length} 개
        </Card>
        <PostContainer posts={currentPosts} />
        <StyledPagination
          total={Math.ceil((data.length / postsPerPage) * 10)}
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
    context.store.dispatch(END); //request를 보내고 성공을 받지못하고 종료되는것을 막아줌
    await context.store.sagaTask.toPromise();
    const data = await fetcher(`/post/myposts/${context.params.id}`, fetcher);
    return { props: { data } };
  }
);

export default Myposts;
