import moment from 'moment';
import { Button, Card, Col, Row } from 'antd';
import { COMMENT_DELETE_REQUEST } from '../reducers/types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CommentDate,
  CommentTtitle,
  DeleteBtn,
  NicknameText,
} from './style/styles';

const CommentList = ({ data }) => {
  // map 반복문안에서 function delete를 사용하니 hook 규칙에 어긋났다
  //component로 만들어서 사용하니 해결
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.me?.id);
  const onClickDeleteComment = (id) =>
    useCallback(() => {
      dispatch({
        type: COMMENT_DELETE_REQUEST,
        data: id,
      });
    });

  const ButtonDeleteComment = ({ id }) => {
    return <DeleteBtn onClick={onClickDeleteComment(id)}>삭제</DeleteBtn>;
  };
  return (
    <>
      {data.Comments.map(({ id, User, content, createdAt, UserId }) => {
        return (
          <Card>
            <Row>
              <CommentTtitle xs={24}>
                <NicknameText>{User.nickname} </NicknameText>
                <CommentDate>{moment(createdAt).fromNow()}</CommentDate>
                {uid === UserId ? <ButtonDeleteComment id={id} /> : ''}
              </CommentTtitle>
              <Col xs={24}> {content}</Col>
            </Row>
          </Card>
        );
      })}
    </>
  );
};

export default CommentList;
