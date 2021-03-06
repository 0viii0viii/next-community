import AppLayout from '../../../components/AppLayout';
import dynamic from 'next/dynamic';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import RedirectPage from '../../../components/RedirectPage';

const EditEditor = dynamic(() => import('../../../components/EditEditor'), {
  // text-editor는 ssr을 지원하지 않기때문에 next/dynamic import를 사용하여 ssr을 강제로 false로 만든다
  ssr: false,
});
//SSR
import wrapper from '../../../store/configureStore';
import { END } from 'redux-saga';
import { LOAD_ME_REQUEST } from '../../../reducers/types';

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);
const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/post/detail/${id}`, fetcher);
  const { me } = useSelector((state) => state.user);

  if (error) {
    console.error('데이터를 불러오지 못했습니다.');
  }

  return (
    <>
      {me ? (
        <>
          <AppLayout>
            <EditEditor data={data} />
          </AppLayout>
        </>
      ) : (
        <RedirectPage />
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
  }
);

export default Edit;
