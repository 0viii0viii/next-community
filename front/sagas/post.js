import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  POST_UPLOAD_FAILURE,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
} from '../reducers/types';
import axios from 'axios';

//비밀번호 변경
function postUploadAPI(data) {
  console.log(data);
  return axios.post('/post', data);
}

function* postUpload(action) {
  try {
    console.log(action.data);
    const result = yield call(postUploadAPI, action.data);

    yield put({
      type: POST_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_UPLOAD_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchpostUpload() {
  yield takeLatest(POST_UPLOAD_REQUEST, postUpload);
}

export default function* postSaga() {
  yield all([fork(watchpostUpload)]);
}
