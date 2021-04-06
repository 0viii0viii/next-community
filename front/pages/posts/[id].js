import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import { useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  LIKE_POST_REQUEST,
  LOAD_ME_REQUEST,
  POST_COMMENT_REQUEST,
  POST_DELETE_REQUEST,
  UNLIKE_POST_REQUEST,
} from '../../reducers/types';
//SSR
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import useSWR, { mutate } from 'swr';

import moment from 'moment';
import { Card, Divider, Form, Input, Button, Col } from 'antd';
import Router, { useRouter } from 'next/router';
import useInput from '../../hooks/useInput';
import Link from 'next/link';
import styled from 'styled-components';
import CommentList from '../../components/CommentList';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';

const PostViewer = dynamic(() => import('../../components/PostViewer'), {
  ssr: false,
});

moment.locale('ko');
const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);
const Posts = (props) => {
  const initialData = props.data;
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { me } = useSelector((state) => state.user);
  const { data, error, mutate } = useSWR(`/post/detail/${id}`, fetcher, {
    initialData,
  });
  const uid = useSelector((state) => state.user.me?.id);
  const [comment, onChangeComment, setComment] = useInput('');
  const {
    postCommentDone,
    postCommentLoading,
    postDeleteLoading,
    postDeleteDone,
    commentDeleteDone,
    likePostDone,
    unlikePostDone,
    postNestedCommentDone,
    deleteNestedCommentDone,
    postEditDone,
  } = useSelector((state) => state.post);

  useEffect(() => {
    if (postCommentDone) {
      // 댓글 업로드 완료시 입력창 초기화
      setComment('');
      mutate();
    }
  }, [postCommentDone]);

  useEffect(() => {
    if (
      commentDeleteDone ||
      postNestedCommentDone ||
      likePostDone ||
      unlikePostDone ||
      deleteNestedCommentDone ||
      postEditDone
    ) {
      //댓글 삭제 완료 -> 리렌더링
      mutate();
    }
  }, [
    commentDeleteDone,
    postNestedCommentDone,
    likePostDone,
    unlikePostDone,
    deleteNestedCommentDone,
    postEditDone,
  ]);

  useEffect(() => {
    if (postDeleteDone) {
      Router.push('/');
    }
  }, [postDeleteDone]);

  if (error) {
    console.error('데이터를 불러오지 못했습니다.');
  }

  const onSubmitComment = useCallback(() => {
    console.log(data.id, comment);
    dispatch({
      type: POST_COMMENT_REQUEST,
      data: { content: comment, postId: data.id, userId: id },
    });
  }, [comment, uid]);

  const onClickDeletePost = useCallback(() => {
    dispatch({
      type: POST_DELETE_REQUEST,
      data: id,
    });
  });

  const onLike = useCallback(() => {
    if (!uid) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: data.id,
    });
    mutate();
  }, [dispatch]);

  const onUnLike = useCallback(() => {
    if (!uid) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: data.id,
    });
    mutate();
  }, [dispatch]);

  const liked = data.Likers?.find((v) => v.id == uid);
  //data.Likers에서 현재 user의 id 와 일치하는 id를 찾는다.
  return (
    <>
      <AppLayout>
        <Card
          title={data.title}
          actions={[
            liked ? (
              <div style={{ display: 'inline' }}>
                <HeartTwoTone twoToneColor="#eb2f96" onClick={onUnLike} />
                <P>{data.Likers.length}</P>
              </div>
            ) : (
              <div>
                <HeartOutlined onClick={onLike} />
                <P>{data.Likers.length}</P>
              </div>
            ),
          ]}
        >
          <Link href={`/myposts/${data.UserId}`}>{data.creator}</Link>
          <PostDetail>
            <P>{data.category}</P>
            <P>{moment(data.createdAt).fromNow()}</P>
            <P>조회{data.view}</P>
          </PostDetail>

          {uid === data.UserId ? (
            <Button.Group>
              <Button>
                <Link href={`/posts/${id}/edit`}>수정</Link>
              </Button>
              <Button onClick={onClickDeletePost} loading={postDeleteLoading}>
                삭제
              </Button>
              <Button onClick={() => router.back()}>이전</Button>
            </Button.Group>
          ) : (
            <Button onClick={() => router.back()}>이전</Button>
          )}
          <Divider />
          <PostViewer data={data} />
        </Card>
        {me ? (
          <>
            <Form onFinish={onSubmitComment}>
              <Card title="댓글">
                <Input.TextArea
                  showCount
                  maxLength={100}
                  value={comment}
                  onChange={onChangeComment}
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={postCommentLoading}
                >
                  작성
                </Button>
              </Card>
            </Form>
          </>
        ) : (
          ''
        )}
        <CommentList data={data} />
      </AppLayout>
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

    const data = await fetcher(`/post/detail/${context.params.id}`, fetcher);
    return { props: { data } };
  }
);

const PostDetail = styled.div`
  margin-top: 5px;
`;

const P = styled.p`
  display: inline;
  padding: 5px;
  color: gray;
`;
export default Posts;
