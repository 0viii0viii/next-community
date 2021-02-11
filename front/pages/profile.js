import { Button, Card, Col, Divider, Input, Row } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

  return (
    <AppLayout>
      <Card>
        <label>{me.nickname} 님의 프로필 | Lv.레전드</label>
        <Divider />
        <label>이메일</label>
        <Input placeholder={me.email} disabled></Input>
        <label>닉네임</label>
        <Input placeholder={me.nickname} disabled></Input>
        <label>비밀번호</label>
        <Input disabled></Input>
        <Button type="primary" block="true">
          수정하기
        </Button>
      </Card>
    </AppLayout>
  );
};

export default Profile;
