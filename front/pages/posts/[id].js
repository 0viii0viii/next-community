import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import { useCallback, useEffect } from 'react';
import {
  COMMENT_DELETE_REQUEST,
  LOAD_ME_REQUEST,
  POST_COMMENT_REQUEST,
  POST_DELETE_REQUEST,
} from '../../reducers/types';
//SSR
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import useSWR from 'swr';

import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { Card, Divider, Form, Input, Button } from 'antd';
import Router, { useRouter } from 'next/router';
import useInput from '../../hooks/useInput';
import Link from 'next/link';
import { ReloadOutlined } from '@ant-design/icons';

moment.locale('ko');
const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);
const Posts = (props) => {
  const initialData = props.data;
  const { data, error } = useSWR('/post/detail/:id', fetcher, { initialData });
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const uid = useSelector((state) => state.user.me?.id);
  const [comment, onChangeComment, setComment] = useInput('');
  const {
    postCommentDone,
    postCommentLoading,
    postDeleteLoading,
    postDeleteDone,
    commentDeleteDone,
  } = useSelector((state) => state.post);

  console.log(data.Comments.id, '데코아이디');

  useEffect(() => {
    if (postCommentDone) {
      // 댓글 업로드 완료시 입력창 초기화
      setComment('');
      router.reload(); //새로고침해서 re-rendering
    }
  }, [postCommentDone]);

  useEffect(() => {
    if (commentDeleteDone) {
      //댓글 삭제 완료 -> 리렌더링
      router.reload();
    }
  }, [commentDeleteDone]);

  useEffect(() => {
    if (postDeleteDone) {
      Router.push('/');
    }
  }, [postDeleteDone]);

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

  const onClickDeleteComment = (id) =>
    useCallback(() => {
      dispatch({
        type: COMMENT_DELETE_REQUEST,
        data: id,
      });
    });
  return (
    <>
      <AppLayout>
        <Card title={data.title}>
          <Link href={`/myposts/${data.UserId}`}>{data.creator}</Link>
          {data.category}
          {moment(data.createdAt).fromNow()}
          <div>조회{data.view}</div>

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

          {ReactHtmlParser(data.content)}
        </Card>
        <Form onFinish={onSubmitComment}>
          <Card title="댓글">
            <Input.TextArea value={comment} onChange={onChangeComment} />
            <Button
              type="primary"
              htmlType="submit"
              loading={postCommentLoading}
            >
              작성
            </Button>
          </Card>
        </Form>
        {data.Comments.map(({ id, User, content, createdAt, UserId }) => (
          <Card>
            {User.nickname} {content} {moment(createdAt).fromNow()}
            {uid === UserId ? (
              <Button onClick={onClickDeleteComment(id)}>삭제</Button>
            ) : (
              ''
            )}
          </Card>
        ))}
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

export default Posts;
