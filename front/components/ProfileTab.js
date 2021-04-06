import { Card } from 'antd';
import { useState } from 'react';
import AppLayout from './AppLayout';
import EditNickname from './EditNickname';
import EditPassword from './EditPassword';

const ProfileTab = () => {
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
  );
};

export default ProfileTab;
