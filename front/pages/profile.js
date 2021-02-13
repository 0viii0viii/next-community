import { Button, Card, Col, Divider, Input, Row } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import EditNickname from '../components/EditNickname';
import EditPassword from '../components/EditPassword';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      Router.push('/login');
    }
  }, [me]);

  if (!me) {
    return null;
  }

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
  );
};

export default Profile;
