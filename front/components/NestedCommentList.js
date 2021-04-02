import { Button, Card } from 'antd';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DELETE_NESTED_COMMENT_REQUEST } from '../reducers/types';
import moment from 'moment';

const NestedCommentList = ({ data, CId, UId }) => {
  console.log(data, 'nested');
  const dispatch = useDispatch();
  const deleteNestedComment = useCallback((id) => {
    console.log(id, '아이디');
    dispatch({
      type: DELETE_NESTED_COMMENT_REQUEST,
      data: id,
    });
  });
  return (
    <>
      {data.Nestedcomments.map(
        ({ id, User, content, createdAt, CommentId }) => {
          {
            if (CId !== CommentId) {
              return null;
            }
          }
          return (
            <Card>
              {User.nickname}, {content}, {moment(createdAt).fromNow()}
              {UId == User.id ? (
                <Button onClick={() => deleteNestedComment(id)}>
                  댓글 삭제
                </Button>
              ) : (
                ''
              )}
            </Card>
          );
        }
      )}
    </>
  );
};

export default NestedCommentList;
