import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CATEGORY_POST_LOAD_REQUEST } from '../../reducers/types';
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

  useEffect(() => {
    dispatch({
      type: CATEGORY_POST_LOAD_REQUEST,
      data: id,
    });
  }, [dispatch, id]);
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

export default Category;
