import styled from 'styled-components';
import { Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import { useCallback } from 'react';
import { LOGOUT_REQUEST } from '../reducers/types';
import Link from 'next/link';
import Meta from 'antd/lib/card/Meta';

const BtnContainer = styled.div`
  margin-top: 10px;
`;

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
        <Meta avatar={<Avatar>벵거</Avatar>} title={me.nickname} />

        <BtnContainer>
          <Button>
            <Link href="/post">글쓰기</Link>
          </Button>
          <Button href={`/myposts/${me.id}`}>내 글</Button>
          <Button>
            <Link href="/profile">프로필</Link>
          </Button>
          <Button onClick={onLogout} loading={logoutLoading}>
            로그아웃
          </Button>
        </BtnContainer>
      </Card>
    </>
  );
};

export default Profile;
