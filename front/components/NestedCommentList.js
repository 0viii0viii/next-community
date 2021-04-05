import { Button, Card, Col, Divider, Row } from 'antd';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DELETE_NESTED_COMMENT_REQUEST } from '../reducers/types';
import moment from 'moment';
import styled from 'styled-components';

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
const NestedCommentWrapper = styled.div`
  display: block;
  background: white;
  border-bottom: 1px solid #d9d9d9;
  width: 100%;
`;
const NestedTitle = styled.p`
  margin-left: 4rem;
  padding-top: 1rem;
  font-weight: bold;
`;
const NestedContent = styled.p`
  margin-left: 4rem;
`;
const NestedBtn = styled.p`
  float: right;
  margin-right: 1rem;
`;

const NestedDate = styled.p`
  display: inline;
  color: gray;
  margin-left: 1rem;
`;

export default NestedCommentList;
