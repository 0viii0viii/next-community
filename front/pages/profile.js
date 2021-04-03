import { Button, Card, Spin } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AppLayout from '../components/AppLayout';
import EditNickname from '../components/EditNickname';
import EditPassword from '../components/EditPassword';
import { RedirectCard } from '../components/style/styles';
//SSR
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_ME_REQUEST } from '../reducers/types';
import wrapper from '../store/configureStore';
import Link from 'next/link';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  console.log(me);
  const tabList = [
    {
      key: 'tab1',
      tab: '계정 정보',
    },
    {
      key: 'tab2',
      tab: '비밀번호 변경',
    },
  ];
  const [key, setKey] = useState(tabList[0].key);

  const contentList = {
    tab1: <EditNickname />,
    tab2: <EditPassword />,
  };
  return (
    <>
      {!me ? (
        <AppLayout>
          <RedirectCard>
            <h1>로그인한 사용자만 접근할 수 있습니다.</h1>
            <Button onClick={() => router.replace('/')}>확인</Button>
          </RedirectCard>
        </AppLayout>
      ) : (
        <>
          <AppLayout>
            <Card
              style={{ width: '100%' }}
              tabList={tabList}
              activeTabkey={key}
              onTabChange={setKey}
            >
              {contentList[key]}
            </Card>
          </AppLayout>
        </>
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

export default Profile;
