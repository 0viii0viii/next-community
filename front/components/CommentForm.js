import moment from 'moment';
import { Button, Card } from 'antd';
import { COMMENT_DELETE_REQUEST } from '../reducers/types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CommentForm = ({ data }) => {
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
    return <Button onClick={onClickDeleteComment(id)}>삭제</Button>;
  };
  return (
    <>
      {data.Comments.map(({ id, User, content, createdAt, UserId }) => {
        return (
          <Card>
            {User.nickname} {content} {moment(createdAt).fromNow()}
            {uid === UserId ? <ButtonDeleteComment id={id} /> : ''}
          </Card>
        );
      })}
    </>
  );
};

export default CommentForm;
