import { Button, Card, Col, Divider, Row } from 'antd';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DELETE_NESTED_COMMENT_REQUEST } from '../reducers/types';
import moment from 'moment';
import {
  NestedTitle,
  NestedContent,
  NestedDate,
  NestedCommentWrapper,
  NestedBtn,
} from '../components/style/styles';

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
            <NestedCommentWrapper>
              <NestedTitle>
                {User.nickname}
                <NestedDate>{moment(createdAt).fromNow()}</NestedDate>
                <NestedBtn>
                  {UId == User.id ? (
                    <Button onClick={() => deleteNestedComment(id)}>
                      삭제
                    </Button>
                  ) : (
                    ''
                  )}
                </NestedBtn>
              </NestedTitle>
              <NestedContent>{content}</NestedContent>
            </NestedCommentWrapper>
          );
        }
      )}
    </>
  );
};

export default NestedCommentList;
