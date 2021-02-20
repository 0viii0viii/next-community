import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import {
  LOAD_ME_REQUEST,
  POST_COMMENT_REQUEST,
  POST_DETAIL_LOAD_REQUEST,
  POST_DELETE_REQUEST,
} from '../../reducers/types';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { Card, Divider, Form, Input, Button } from 'antd';
import Router from 'next/router';
import useInput from '../../hooks/useInput';

moment.locale('ko');
const Posts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const uid = useSelector((state) => state.user.me?.id);
  const [comment, onChangeComment, setComment] = useInput('');
  const {
    postDetail,
    postCommentDone,
    postCommentLoading,
    postDeleteLoading,
    postDeleteDone,
  } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOAD_REQUEST,
      data: id,
    });
  }, [id, postCommentDone]);

  useEffect(() => {
    dispatch({
      type: LOAD_ME_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (postCommentDone) {
      setComment('');
    }
  }, [postCommentDone]);

  useEffect(() => {
    if (postDeleteDone) {
      Router.push('/');
    }
  }, [postDeleteDone]);

  const onSubmitComment = useCallback(() => {
    console.log(postDetail.id, comment);
    dispatch({
      type: POST_COMMENT_REQUEST,
      data: { content: comment, postId: postDetail.id, userId: id },
    });
  }, [comment, uid]);

  const onClickDeletePost = useCallback(() => {
    dispatch({
      type: POST_DELETE_REQUEST,
      data: id,
    });
  });

  return (
    <>
      <AppLayout>
        <Card title={postDetail.title}>
          {postDetail.creator}
          {postDetail.category}
          {moment(postDetail.createdAt).fromNow()}

          {uid === postDetail.UserId ? (
            <Button.Group>
              <Button>수정</Button>
              <Button onClick={onClickDeletePost} loading={postDeleteLoading}>
                삭제
              </Button>
            </Button.Group>
          ) : (
            ''
          )}
          <Divider />
          {/* <Viewer initialValue={postDetail.content} /> */}
          {ReactHtmlParser(postDetail.content)}
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
        {Array.isArray(postDetail.Comments)
          ? postDetail.Comments.map(({ User, content, createdAt }) => (
              <Card>
                {User.nickname} {content} {moment(createdAt).fromNow()}
              </Card>
            ))
          : '없네'}
      </AppLayout>
    </>
  );
};

export default Posts;
