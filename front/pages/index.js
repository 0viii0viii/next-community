import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostContainer from '../components/PostContainer';
import { LOAD_ME_REQUEST, POST_LOAD_REQUEST } from '../reducers/types';

const Home = () => {
  const dispatch = useDispatch();
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
  return (
    <AppLayout>
      <PostContainer />
    </AppLayout>
  );
};

export default Home;
