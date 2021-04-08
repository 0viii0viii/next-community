import AppLayout from '../../components/AppLayout';
import PostContainer from '../../components/PostContainer';
import { LOAD_ME_REQUEST } from '../../reducers/types';
//SSR
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { Card } from 'antd';
import { useRouter } from 'next/router';
import { serverUrl } from '../../config/config';

const Search = ({ data }) => {
  const router = useRouter();
  const { searchTerm } = router.query;
  return (
    <>
      {data.posts.length != 0 ? (
        <AppLayout>
          <Card>
            검색어: "{searchTerm}"에 해당하는 게시글 {data.posts.length}개가
            존재합니다.
          </Card>
          <PostContainer data={data} />
        </AppLayout>
      ) : (
        <AppLayout>
          <Card>
            검색어: "{searchTerm}"에 해당하는 검색 게시물이 존재하지 않습니다
          </Card>
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
    context.store.dispatch(END); //request를 보내고 성공을 받지못하고 종료되는것을 막아줌
    await context.store.sagaTask.toPromise();
    const query = context.query;
    const page = query.page || 1;
    let data = null;
    try {
      const res = await fetch(
        `${serverUrl}/search/${encodeURI(
          context.params.searchTerm
        )}?page=${page}`
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

export default Search;
