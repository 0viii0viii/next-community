import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import PostContainer from '../../components/PostContainer';
import {
  LOAD_ME_REQUEST,
  POST_SEARCH_LOAD_REQUEST,
} from '../../reducers/types';
//SSR
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

const Search = () => {
  const router = useRouter();
  const { id } = router.query;
  const { searchLoadPosts } = useSelector((state) => state.post);
  console.log(searchLoadPosts.length);

  return (
    <>
      {searchLoadPosts != 0 ? (
        <AppLayout>
          <PostContainer posts={searchLoadPosts} />
        </AppLayout>
      ) : (
        <AppLayout>
          <h1> {id} : 해당 검색 게시물이 존재하지 않습니다</h1>
        </AppLayout>
      )}
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
    context.store.dispatch({
      type: POST_SEARCH_LOAD_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END); //request를 보내고 성공을 받지못하고 종료되는것을 막아줌
    await context.store.sagaTask.toPromise();
  }
);

export default Search;
