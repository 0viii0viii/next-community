//SSR
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
//Style
import { Card } from 'antd';

import PostContainer from '../../components/PostContainer';
import AppLayout from '../../components/AppLayout';
import { LOAD_ME_REQUEST } from '../../reducers/types';
import { useSelector } from 'react-redux';

const Myposts = ({ data }) => {
  const { me } = useSelector((state) => state.user);
  return (
    <>
      <AppLayout>
        <Card>
          <h2>{me.nickname}</h2>님의 게시글 {data.posts.length}개
        </Card>
        <PostContainer data={data} />
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
    const query = context.query;
    const page = query.page || 1;
    let data = null;

    try {
      const res = await fetch(
        `http://localhost:5000/post/myposts/${context.params.id}?page=${page}`
      );
      if (res.status != 200) {
        throw new Error('Failed to Fetch');
      }
      data = await res.json();
    } catch (error) {
      data = { error: { message: error.message } };
    }
    return { props: { data } };
  }
);

export default Myposts;
