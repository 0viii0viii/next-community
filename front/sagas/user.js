import { all, put, fork, call, takeLatest } from 'redux-saga/effects';
import {
  EDIT_NICKNAME_FAILURE,
  EDIT_NICKNAME_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  EDIT_PASSWORD_FAILURE,
  EDIT_PASSWORD_REQUEST,
  EDIT_PASSWORD_SUCCESS,
  EMAIL_AUTH_FAILURE,
  EMAIL_AUTH_REQUEST,
  EMAIL_AUTH_SUCCESS,
  LOAD_ME_FAILURE,
  LOAD_ME_REQUEST,
  LOAD_ME_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../reducers/types';
import axios from 'axios';
import Router from 'next/router';
//회원가입
function registerAPI(data) {
  return axios.post('/user/register', data);
}

function* register(action) {
  try {
    const result = yield call(registerAPI, action.data); // call,fork 둘다 함수실행 fork 비동기, call 동기
    console.log(result);
    yield put({
      type: REGISTER_SUCCESS,
    });
    yield call(Router.push, `/login`);
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      error: e.response.data,
    });
  }
}
//이메일 인증
function emailAuthAPI(data) {
  return axios.post('/email', data);
}

function* emailAuth(action) {
  try {
    const result = yield call(emailAuthAPI, action.data);
    console.log(result);
    yield put({
      type: EMAIL_AUTH_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: EMAIL_AUTH_FAILURE,
      error: e.response.data,
    });
  }
}

//로그인
function loginAPI(data) {
  return axios.post('/user/login', data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    console.log(result);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
    yield call(Router.push, '/');
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      error: e.response.data,
    });
  }
}

//로그아웃
function logoutAPI() {
  return axios.post('/user/logout');
}

function* logout() {
  try {
    const result = yield call(logoutAPI);
    console.log(result);
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
      error: e.response.data,
    });
  }
}

//유저 정보 가져오기
function loadMeAPI() {
  return axios.get('/user');
}

function* loadMe() {
  try {
    const result = yield call(loadMeAPI);
    yield put({
      type: LOAD_ME_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_ME_FAILURE,
      error: e.response.data,
    });
  }
}

//닉네임 변경
function editNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data);

    yield put({
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: e.response.data,
    });
  }
}
//비밀번호 변경
function editPasswordAPI(data) {
  return axios.patch('/user/password', data);
}

function* editPassword(action) {
  try {
    const result = yield call(editPasswordAPI, action.data);

    yield put({
      type: EDIT_PASSWORD_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: EDIT_PASSWORD_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchemailAuth() {
  yield takeLatest(EMAIL_AUTH_REQUEST, emailAuth); //takeLatest 다수의 요청이 들어온다면 가장 첫번째 요청만을 수행함
}
function* watchEditPassword() {
  yield takeLatest(EDIT_PASSWORD_REQUEST, editPassword);
}
function* watchEditNickname() {
  yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname);
}
function* watchLoadMe() {
  yield takeLatest(LOAD_ME_REQUEST, loadMe);
}
function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}
function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}
function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

export default function* userSaga() {
  yield all([
    fork(watchRegister),
    fork(watchemailAuth),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadMe),
    fork(watchEditNickname),
    fork(watchEditPassword),
  ]);
}
