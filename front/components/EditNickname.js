import { Divider, Input, Form } from 'antd';
import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { EDIT_NICKNAME_REQUEST } from '../reducers/types';

const EditNickname = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: EDIT_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <>
      <label>{me.nickname} 님의 프로필 | Lv.레전드</label>
      <Divider />
      <label>이메일</label>
      <Input placeholder={me.email} disabled></Input>
      <Divider />
      <Form>
        <Input.Search
          addonBefore="닉네임"
          value={nickname}
          onChange={onChangeNickname}
          enterButton={'수정하기'}
          onSearch={onSubmit}
        />
      </Form>
    </>
  );
};

export default EditNickname;
