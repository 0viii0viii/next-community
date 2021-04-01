import { Button, Card, Form, Input } from 'antd';
import { useCallback } from 'react';
import useInput from '../hooks/useInput';
import { POST_NESTED_COMMENT_REQUEST } from '../reducers/types';

const NestedCommentForm = ({ data }) => {
  const [nested, onChangeNested, setNested] = useInput('');
  const onSubmitNested = useCallback(() => {
    // dispatch({
    //   type: POST_NESTED_COMMENT_REQUEST,
    //   data:{ content: content, userId:,postId: data.id, commentId:}
    // })
  });
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
          <Button type="primary" htmlType="submit">
            작성
          </Button>
        </Card>
      </Form>
    </>
  );
};

export default NestedCommentForm;
