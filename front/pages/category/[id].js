import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CATEGORY_POST_LOAD_REQUEST } from '../../reducers/types';

import Link from 'next/link';
import { Card } from 'antd';
import moment from 'moment';

moment.locale('ko');

const Category = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { categoryLoadPosts } = useSelector((state) => state.post);
  console.log(categoryLoadPosts);

  useEffect(() => {
    dispatch({
      type: CATEGORY_POST_LOAD_REQUEST,
      data: id,
    });
  }, [dispatch, id]);
  return (
    <>
      <AppLayout>
        {categoryLoadPosts.map((post) => {
          return (
            <Link href={`/posts/${post.id}`}>
              <Card>
                {post.title} {post.creator}
                {moment(post.createdAt).fromNow()}
                {post.Comments.length}
              </Card>
            </Link>
          );
        })}
      </AppLayout>
    </>
  );
};

export default Category;
