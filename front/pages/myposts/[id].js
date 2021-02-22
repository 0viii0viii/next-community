import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Pagination } from 'antd';

import styled from 'styled-components';
import { useRouter } from 'next/router';
import PostContainer from '../../components/PostContainer';
import AppLayout from '../../components/AppLayout';
import { LOAD_ME_REQUEST, MYPOST_LOAD_REQUEST } from '../../reducers/types';

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Myposts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { myposts, mypostLoadLoading } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = myposts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (page) => setCurrentPage(page);

  useEffect(() => {
    dispatch({
      type: LOAD_ME_REQUEST,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: MYPOST_LOAD_REQUEST,
      data: id,
    });
  }, [dispatch, id]);

  const Body = (
    <AppLayout>
      <PostContainer posts={currentPosts} />
      <StyledPagination
        total={Math.ceil((myposts.length / postsPerPage) * 10)}
        onChange={paginate}
        current={currentPage}
      />
    </AppLayout>
  );
  return <>{mypostLoadLoading === true ? '로딩중' : Body}</>;
};

export default Myposts;
