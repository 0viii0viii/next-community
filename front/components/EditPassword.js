import { Divider, Input, Form, Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { EDIT_PASSWORD_REQUEST } from '../reducers/types';
import Router from 'next/router';
import { initialState } from '../reducers/user';

const EditPassword = () => {
  const dispatch = useDispatch();
  const { me, editPasswordLoading, editPasswordDone } = useSelector(
    (state) => state.user
  );
  const [password, onChangePassword] = useInput('');
  useEffect(() => {
    if (editPasswordDone) {
      alert('비밀번호가 성공적으로 변경되었습니다.');
      Router.replace('/');
    }
  }, [editPasswordDone]);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  });

  const onSubmit = useCallback(() => {
    dispatch({
      type: EDIT_PASSWORD_REQUEST,
      data: { password },
    });
  }, [password]);

  return (
    <>
      <label>{me.nickname} 님의 프로필</label>
      <Divider />
      <Form onFinish={onSubmit}>
        <label>새 비밀번호</label>
        <Input
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        ></Input>
        <Divider />
        <label>새 비밀번호 확인</label>
        <Input
          type="password"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
          required
        ></Input>
        <Divider />
        {passwordError && (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}

        <Button
          type="primary"
          htmlType="submit"
          loading={editPasswordLoading}
          block="true"
        >
          수정하기
        </Button>
      </Form>
    </>
  );
};

const ErrorMessage = styled.div`
  color: red;
`;

export default EditPassword;
