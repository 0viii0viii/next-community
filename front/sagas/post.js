import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  CATEGORY_POST_LOAD_FAILURE,
  CATEGORY_POST_LOAD_REQUEST,
  CATEGORY_POST_LOAD_SUCCESS,
  COMMENT_DELETE_FAILURE,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  POST_COMMENT_FAILURE,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
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
//댓글 삭제
function commentDeleteAPI(data) {
  console.log(data, '사가용');
  return axios.delete(`/post/comment/${data}`);
}

function* commentDelete(action) {
  try {
    const result = yield call(commentDeleteAPI, action.data);
    yield put({
      type: COMMENT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: COMMENT_DELETE_FAILURE,
      error: e.response.data,
    });
  }
}
function* watchcommentDelete() {
  yield takeLatest(COMMENT_DELETE_REQUEST, commentDelete);
}
function* watchsearchPostLoad() {
  yield takeLatest(POST_SEARCH_LOAD_REQUEST, searchPostLoad);
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
    fork(watchpostComment),
    fork(watchpostDelete),
    fork(watchpostEdit),
    fork(watchsearchPostLoad),
    fork(watchcommentDelete),
  ]);
}
