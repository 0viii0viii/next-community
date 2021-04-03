import moment from 'moment';
import { Button, Card, Col, Divider, Row } from 'antd';
import { COMMENT_DELETE_REQUEST } from '../reducers/types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CommentBtn,
  Commentcontent,
  CommentDate,
  CommentTtitle,
  ContentWrapper,
  DeleteBtn,
  NicknameText,
} from './style/styles';
import NestedCommentForm from './NestedCommentForm';
import NestedCommentList from './NestedCommentList';

const CommentList = ({ data }) => {
  // map 반복문안에서 function delete를 사용하니 hook 규칙에 어긋났다
  //component로 만들어서 사용하니 해결
  const dispatch = useDispatch();
  const [pid, setpId] = useState('');
  const uid = useSelector((state) => state.user.me?.id);
  const { postNestedCommentDone } = useSelector((state) => state.post);
  const onClickDeleteComment = (id) =>
    useCallback(() => {
      dispatch({
        type: COMMENT_DELETE_REQUEST,
        data: id,
      });
    });

  useEffect(() => {
    //대댓글 업로드후 폼 닫기
    setpId('');
  }, [postNestedCommentDone]);

  const handleCommentClick = useCallback((id) => {
    if (!uid) {
      return alert('로그인이 필요합니다.');
    }
    pid == '' ? setpId(id) : setpId(''); //누르면 열리고, 한 번 더 누르면 닫히게
  });
  console.log(data.Nestedcomments, '?');
  const ButtonDeleteComment = ({ id }) => {
    return <DeleteBtn onClick={onClickDeleteComment(id)}>삭제</DeleteBtn>;
  };

  return (
    <>
      {data.Comments.map(({ id, User, content, createdAt, UserId, PostId }) => {
        return (
          <>
            <Card key={id}>
              <Row>
                <CommentTtitle xs={24}>
                  <NicknameText>{User.nickname} </NicknameText>
                  <CommentDate>{moment(createdAt).fromNow()}</CommentDate>
                  {uid === UserId ? <ButtonDeleteComment id={id} /> : ''}
                </CommentTtitle>
                <ContentWrapper>
                  <Commentcontent>{content}</Commentcontent>
                  <CommentBtn onClick={() => handleCommentClick(id)}>
                    댓글 달기
                  </CommentBtn>
                </ContentWrapper>
              </Row>
              {pid == id ? (
                <NestedCommentForm PostId={PostId} CommentId={pid} />
              ) : (
                ''
              )}
            </Card>
            <NestedCommentList UId={uid} CId={id} data={data} />
          </>
        );
      })}
    </>
  );
};

export default CommentList;
