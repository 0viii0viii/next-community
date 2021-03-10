import styled from 'styled-components';
import { Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import { useCallback } from 'react';
import { LOGOUT_REQUEST } from '../reducers/types';
import Link from 'next/link';
import Meta from 'antd/lib/card/Meta';
import { BtnContainer, ProfileBtn } from '../components/style/styles';

const Profile = () => {
  const dispatch = useDispatch();
  const { me, logoutLoading } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, []);
  return (
    <>
      <Card>
        <Meta title={me.nickname} />

        <BtnContainer>
          <ProfileBtn>
            <Link href="/post">글쓰기</Link>
          </ProfileBtn>
          <ProfileBtn href={`/myposts/${me.id}`}>내 글</ProfileBtn>
          <ProfileBtn>
            <Link href="/profile">프로필</Link>
          </ProfileBtn>
          <ProfileBtn onClick={onLogout} loading={logoutLoading}>
            로그아웃
          </ProfileBtn>
        </BtnContainer>
      </Card>
    </>
  );
};

export default Profile;
