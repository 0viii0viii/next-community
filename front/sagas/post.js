import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  CATEGORY_POST_LOAD_FAILURE,
  CATEGORY_POST_LOAD_REQUEST,
  CATEGORY_POST_LOAD_SUCCESS,
  MYPOST_LOAD_FAILURE,
  MYPOST_LOAD_REQUEST,
  MYPOST_LOAD_SUCCESS,
  POST_COMMENT_FAILURE,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAIL_LOAD_FAILURE,
  POST_DETAIL_LOAD_REQUEST,
  POST_DETAIL_LOAD_SUCCESS,
  POST_EDIT_FAILURE,
  POST_EDIT_REQUEST,
  POST_EDIT_SUCCESS,
  POST_LOAD_FAILURE,
  POST_LOAD_REQUEST,
  POST_LOAD_SUCCESS,
  POST_SEARCH_LOAD_FAILURE,
  POST_SEARCH_LOAD_REQUEST,
  POST_SEARCH_LOAD_SUCCESS,
  POST_UPLOAD_FAILURE,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
} from '../reducers/types';
import axios from 'axios';
import Router from 'next/router';

//게시글 업로드
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
    console.log(result.data.id, '사가');
    yield call(Router.push, `/posts/${result.data.id}`);
  } catch (e) {
    yield put({
      type: POST_UPLOAD_FAILURE,
      error: e.response.data,
    });
  }
}

//댓글 업로드

function postCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* postComment(action) {
  try {
    const result = yield call(postCommentAPI, action.data);
    console.log(result);
    yield put({
      type: POST_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: POST_COMMENT_FAILURE,
      error: e.response.data,
    });
  }
}

//카테고리 게시글 로드
function categoryFindAPI(data) {
  console.log(data);
  return axios.get(`/post/${encodeURIComponent(data)}`);
}

function* categoryFind(action) {
  try {
    const result = yield call(categoryFindAPI, action.data);
    console.log(result);
    yield put({
      type: CATEGORY_POST_LOAD_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: CATEGORY_POST_LOAD_FAILURE,
      error: e.response.data,
    });
  }
}

//게시글 로드
function postLoadAPI() {
  return axios.get('/post');
}

function* postLoad(action) {
  try {
    const result = yield call(postLoadAPI, action);
    console.log(result);
    yield put({
      type: POST_LOAD_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_LOAD_FAILURE,
      error: e.response.data,
    });
  }
}

//게시글 내용 로드
function postDetailLoadAPI(data) {
  return axios.get(`/post/detail/${data}`);
}

function* postDetailLoad(action) {
  try {
    const result = yield call(postDetailLoadAPI, action.data);
    yield put({
      type: POST_DETAIL_LOAD_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOAD_FAILURE,
      error: e.response.data,
    });
  }
}
//게시글 삭제
function postDeleteAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* postDelete(action) {
  try {
    const result = yield call(postDeleteAPI, action.data);
    console.log(result, '사가 삭제result');
    yield put({
      type: POST_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      error: e.response.data,
    });
  }
}
//게시글 수정
function postEditAPI(data) {
  return axios.patch(`/post/${data.id}/edit`, data);
}

function* postEdit(action) {
  try {
    const result = yield call(postEditAPI, action.data);
    yield put({
      type: POST_EDIT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_EDIT_FAILURE,
      error: e.response.data,
    });
  }
}
//내 게시글 로드
function myPostLoadAPI(data) {
  console.log(data, '사가용');
  return axios.get(`/post/myposts/${data}`);
}

function* myPostLoad(action) {
  try {
    const result = yield call(myPostLoadAPI, action.data);
    yield put({
      type: MYPOST_LOAD_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: MYPOST_LOAD_FAILURE,
      error: e.response.data,
    });
  }
}
//검색 포스트 로드
function searchPostLoadAPI(data) {
  console.log(data, '사가용');
  return axios.get(`/search/${encodeURIComponent(data)}`);
}

function* searchPostLoad(action) {
  try {
    const result = yield call(searchPostLoadAPI, action.data);
    yield put({
      type: POST_SEARCH_LOAD_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_SEARCH_LOAD_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchsearchPostLoad() {
  yield takeLatest(POST_SEARCH_LOAD_REQUEST, searchPostLoad);
}
function* watchmyPostLoad() {
  yield takeLatest(MYPOST_LOAD_REQUEST, myPostLoad);
}
function* watchpostEdit() {
  yield takeLatest(POST_EDIT_REQUEST, postEdit);
}

function* watchpostDelete() {
  yield takeLatest(POST_DELETE_REQUEST, postDelete);
}
function* watchpostComment() {
  yield takeLatest(POST_COMMENT_REQUEST, postComment);
}
function* watchpostDetailLoad() {
  yield takeLatest(POST_DETAIL_LOAD_REQUEST, postDetailLoad);
}
function* watchpostLoad() {
  yield takeLatest(POST_LOAD_REQUEST, postLoad);
}
function* watchcategoryFind() {
  yield takeLatest(CATEGORY_POST_LOAD_REQUEST, categoryFind);
}
function* watchpostUpload() {
  yield takeLatest(POST_UPLOAD_REQUEST, postUpload);
}

export default function* postSaga() {
  yield all([
    fork(watchpostUpload),
    fork(watchcategoryFind),
    fork(watchpostLoad),
    fork(watchpostDetailLoad),
    fork(watchpostComment),
    fork(watchpostDelete),
    fork(watchpostEdit),
    fork(watchmyPostLoad),
    fork(watchsearchPostLoad),
  ]);
}
