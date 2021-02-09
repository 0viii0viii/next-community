import { all, put, fork, call, takeLatest } from 'redux-saga/effects';
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../reducers/types';
import axios from 'axios';

function registerAPI(data) {
  return axios.post('http://localhost:5000/user', data);
}

function* register(action) {
  try {
    const result = yield call(registerAPI, action.data); // call,fork 둘다 함수실행 fork 비동기, call 동기
    console.log(result);
    yield put({
      type: REGISTER_SUCCESS,
      //   data: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}

export default function* userSaga() {
  yield all([fork(watchRegister)]);
}
