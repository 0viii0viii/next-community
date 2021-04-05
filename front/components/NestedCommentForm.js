import { Button, Card, Form, Input } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { POST_NESTED_COMMENT_REQUEST } from '../reducers/types';

const NestedCommentForm = ({ PostId, CommentId }) => {
  const { me } = useSelector((state) => state.user);
  const { postNestedCommentDone, postNestedCommentLoading } = useSelector(
    (state) => state.post
  );
  const [nested, onChangeNested, setNested] = useInput('');
  const dispatch = useDispatch();
  const onSubmitNested = useCallback(() => {
    dispatch({
      type: POST_NESTED_COMMENT_REQUEST,
      data: {
        content: nested,
        userId: me.id,
        postId: PostId,
        commentId: CommentId,
      },
    });
  });

  useEffect(() => {
    if (postNestedCommentDone) {
      setNested('');
    }
  }, [postNestedCommentDone]);

  return (
    <>
      <Form onFinish={onSubmitNested}>
        <Card>
          <Input.TextArea
            showCount
            maxLength={100}
            value={nested}
            onChange={onChangeNested}
          />
          <Button
            type="primary"
            htmlType="submit"
            loading={postNestedCommentLoading}
          >
            작성
          </Button>
        </Card>
      </Form>
    </>
  );
};

export default NestedCommentForm;
