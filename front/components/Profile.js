import styled from 'styled-components';

import { Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import { useCallback } from 'react';
import { LOGOUT_REQUEST } from '../reducers/types';

const Profile = () => {
  const dispatch = useDispatch();
  const { me, logoutLoading } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  });
  return (
    <>
      <Card>
        <Avatar>레벨</Avatar>
        <p>{me.nickname}</p>
        <Button>글쓰기</Button>
        <Button>내 글</Button>
        <Button>레전드</Button>
        <Button onClick={onLogout} loading={logoutLoading}>
          로그아웃
        </Button>
      </Card>
    </>
  );
};

export default Profile;
