import { Col, Row } from 'antd';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { REGISTER_REQUEST } from '../reducers/types';
import {
  FormWrapper,
  Global,
  StyledInput,
  StyledButton,
  ErrorMessage,
} from '../components/style/styles';

const register = () => {
  const dispatch = useDispatch();
  const { registerLoading, registerError } = useSelector((state) => state.user);
  //에러가 있을경우
  useEffect(() => {
    if (registerError) {
      alert(registerError);
    }
  }, [registerError]);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    // password 일치 여부확인
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      //password가 다르면 error
      return setPasswordError(true);
    }
    dispatch({
      type: REGISTER_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck]);

  return (
    <>
      <Global />
      <Row>
        <Col flex="auto"></Col>
        <Col xs={24} sm={24} md={6}>
          <FormWrapper onFinish={onSubmit}>
            <Link href="/">
              <h1>Gunners</h1>
            </Link>

            <StyledInput
              name="user-email"
              type="email"
              value={email}
              onChange={onChangeEmail}
              required
              bordered={false}
              placeholder="이메일"
            />
            <StyledInput
              name="user-nickname"
              value={nickname}
              onChange={onChangeNickname}
              required
              bordered={false}
              placeholder="닉네임"
            />
            <StyledInput
              name="user-password"
              type="password"
              value={password}
              onChange={onChangePassword}
              required
              bordered={false}
              placeholder="비밀번호"
            />
            <StyledInput
              name="user-password-check"
              type="password"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              required
              bordered={false}
              placeholder="비밀번호 확인"
            />
            {passwordError && ( //passwordError가 존재하면 ErrorMessage
              <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
            )}
            <StyledButton
              type="primary"
              htmlType="submit"
              loading={registerLoading}
            >
              가입하기
            </StyledButton>

            <p>이미 회원이신가요?</p>
            <Link href="/login">로그인하기</Link>
          </FormWrapper>
        </Col>
        <Col flex="auto"></Col>
      </Row>
    </>
  );
};

export default register;
