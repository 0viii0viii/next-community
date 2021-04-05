import { Button, Card, Col, Divider, Input, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { LOAD_ME_REQUEST, LOGIN_REQUEST } from '../reducers/types';
import AppLayout from '../components/AppLayout';
import styled, { createGlobalStyle } from 'styled-components';
//SSR
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import Form from 'antd/lib/form/Form';
const login = () => {
  const dispatch = useDispatch();
  const { me, loginLoading, loginError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const router = useRouter();
  //로그인 오류시 오류 알림
  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  const onSubmitLogin = useCallback(() => {
    dispatch({
      type: LOGIN_REQUEST,
      data: { email, password },
    });
  }, [email, password]);

  return (
    <>
      {me ? (
        <>
          <AppLayout>
            <RedirectCard>
              <h1> Arsenal</h1>
              <p>이미 로그인되어있습니다.</p>
              <Button onClick={() => router.replace('/')}> 확인</Button>
            </RedirectCard>
          </AppLayout>
        </>
      ) : (
        <>
          <Global />
          <Row>
            <Col flex="auto"></Col>
            <Col xs={24} sm={24} md={24}>
              <FormWrapper onFinish={onSubmitLogin}>
                <Link href="/">
                  <h1>Gunners</h1>
                </Link>
                <KakaoLogin href="http://localhost:5000/auth/kakao">
                  카카오톡으로 로그인
                </KakaoLogin>
                <Divider>Or</Divider>
                <h3>이메일로 로그인</h3>
                <StyledInput
                  type="email"
                  value={email}
                  onChange={onChangeEmail}
                  bordered={false}
                  placeholder="이메일"
                />
                <StyledInput
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                  bordered={false}
                  placeholder="비밀번호"
                />
                <StyledButton
                  type="primary"
                  htmlType="submit"
                  loading={loginLoading}
                >
                  로그인
                </StyledButton>

                <p>아직 회원이 아니신가요?</p>
                <Link href="/register">회원가입하기</Link>
              </FormWrapper>
            </Col>
            <Col flex="auto"></Col>
          </Row>
        </>
      )}
    </>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // cookie front -> backend 공유
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      // 쿠키를 지웠다가 넣었다가 해야 쿠키가 다른사용자와 공유가되지않음
      axios.defaults.headers.Cookie = cookie;
    }
    //결과를 reducer의 hydrate로 보냄
    context.store.dispatch({
      type: LOAD_ME_REQUEST,
    });
    context.store.dispatch(END); //request를 보내고 성공을 받지못하고 종료되는것을 막아줌
    await context.store.sagaTask.toPromise();
  }
);

const FormWrapper = styled(Form)`
  text-align: center;
  background: white;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  height: 100vh;
`;
const Global = createGlobalStyle`
 body {
     background:#ebeef1;
     font-family: 'Roboto', sans-serif;
 }
`;

const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
  background: primary;
  height: 50px;
  cursor: pointer;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;

  border-bottom: 1px solid #ebeef1;
`;

const RedirectCard = styled(Card)`
  text-align: center;
  justify-content: center;
`;

const KakaoLogin = styled(Button)`
  background-color: yellow;
  width: 100%;
  border-radius: 5px;
`;

export default login;
