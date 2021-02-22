import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { Pagination } from 'antd';
import PostContainer from '../components/PostContainer';
import { LOAD_ME_REQUEST, POST_LOAD_REQUEST } from '../reducers/types';
import styled from 'styled-components';

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { postDeleteDone, posts, postLoadLoading } = useSelector(
    (state) => state.post
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (page) => setCurrentPage(page);

  useEffect(() => {
    dispatch({
      type: LOAD_ME_REQUEST,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: POST_LOAD_REQUEST,
    });
  }, []);

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
  return <>{postLoadLoading === true ? '로딩중' : Body}</>;
};

export default Home;
