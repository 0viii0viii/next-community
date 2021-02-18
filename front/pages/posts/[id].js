import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { POST_DETAIL_LOAD_REQUEST } from '../../reducers/types';

import moment from 'moment';
import { Viewer } from '@toast-ui/react-editor';
import { Card, Divider } from 'antd';

moment.locale('ko');
const Category = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { postDetail } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOAD_REQUEST,
      data: id,
    });
  }, [dispatch, id]);
  return (
    <>
      <AppLayout>
        <Card title={postDetail.title}>
          {postDetail.creator}
          {postDetail.category}
          {moment(postDetail.createdAt).fromNow()}
          <Divider />
          <Viewer initialValue={postDetail.content} />
        </Card>
      </AppLayout>
    </>
  );
};

export default Category;
