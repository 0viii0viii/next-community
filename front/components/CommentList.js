import moment from 'moment';
import { Button, Card, Col, Divider, Row } from 'antd';
import { COMMENT_DELETE_REQUEST } from '../reducers/types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NestedCommentForm from './NestedCommentForm';
import NestedCommentList from './NestedCommentList';
import styled from 'styled-components';

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

const NicknameText = styled.p`
  display: inline;
  font-weight: bold;
  padding-bottom: 1rem;
`;

const DeleteBtn = styled(Button)`
  float: right;
  margin-bottom: 10px;
  &: hover {

  }
`;
const CommentTtitle = styled(Col)`
  padding-bottom: 1rem;
`;
const CommentDate = styled.p`
  display: inline;
  color: gray;
  text-weight: bold;
`;
const CommentBtn = styled(Button)`
  border: none;
  height: 0;
  padding: 0;
`;
const Commentcontent = styled.p``;
const ContentWrapper = styled.div`
  display: block;
`;

export default CommentList;
