import AppLayout from '../../components/AppLayout';
import PostContainer from '../../components/PostContainer';
import { LOAD_ME_REQUEST } from '../../reducers/types';
//SSR
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import moment from 'moment';

moment.locale('ko');

const Category = ({ data }) => {
  return (
    <>
      <AppLayout>
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
    const res = await fetch(
      `http://localhost:5000/category/${context.params.id}?page=${page}`
    );
    data = await res.json();
    return { props: { data } };
  }
);

export default Category;
