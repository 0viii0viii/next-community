import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import Router from 'next/router';
import { useEffect } from 'react';
//SSR
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_ME_REQUEST } from '../reducers/types';

const PostEditor = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

const Post = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      Router.push('/login');
    }
  }, [me]);

  if (!me) {
    return null;
  }
  return (
    <>
      <AppLayout>
        <PostEditor />
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
  }
);

export default Post;
