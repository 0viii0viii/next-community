import {
  all,
  call,
  fork,
  put,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import {
  COMMENT_DELETE_FAILURE,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  DELETE_NESTED_COMMENT_FAILURE,
  DELETE_NESTED_COMMENT_REQUEST,
  DELETE_NESTED_COMMENT_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  POST_COMMENT_FAILURE,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_EDIT_FAILURE,
  POST_EDIT_REQUEST,
  POST_EDIT_SUCCESS,
  POST_NESTED_COMMENT_FAILURE,
  POST_NESTED_COMMENT_REQUEST,
  POST_NESTED_COMMENT_SUCCESS,
  POST_UPLOAD_FAILURE,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
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

//대댓글 업로드

function postNestedCommentAPI(data) {
  return axios.post(`/post/${data.postId}/nestedcomment`, data);
}

function* postNestedComment(action) {
  try {
    const result = yield call(postNestedCommentAPI, action.data);
    console.log(result);
    yield put({
      type: POST_NESTED_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: POST_NESTED_COMMENT_FAILURE,
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
    yield call(Router.push, `/posts/${action.data.id}`);
  } catch (e) {
    yield put({
      type: POST_EDIT_FAILURE,
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
//대댓글 삭제
function nestedCommentDeleteAPI(data) {
  return axios.delete(`/post/nestedComment/${data}`);
}

function* nestedCommentDelete(action) {
  try {
    const result = yield call(nestedCommentDeleteAPI, action.data);
    yield put({
      type: DELETE_NESTED_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: DELETE_NESTED_COMMENT_FAILURE,
      error: e.response.data,
    });
  }
}

//게시글 좋아요
function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
//게시글 좋아요 취소
function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchlikePost() {
  yield takeEvery(LIKE_POST_REQUEST, likePost);
  //takeEvery: 좋아요 기능이기 때문 모든 (좋아요)요청을 handle 한다.
}
function* watchunlikePost() {
  yield takeEvery(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchcommentDelete() {
  yield takeLatest(COMMENT_DELETE_REQUEST, commentDelete);
}
function* watchnestedCommentDelete() {
  yield takeLatest(DELETE_NESTED_COMMENT_REQUEST, nestedCommentDelete);
}

function* watchpostEdit() {
  yield takeLatest(POST_EDIT_REQUEST, postEdit);
}
function* watchpostNestedComment() {
  yield takeLatest(POST_NESTED_COMMENT_REQUEST, postNestedComment);
}
function* watchpostDelete() {
  yield takeLatest(POST_DELETE_REQUEST, postDelete);
}
function* watchpostComment() {
  yield takeLatest(POST_COMMENT_REQUEST, postComment);
}
function* watchpostUpload() {
  yield takeLatest(POST_UPLOAD_REQUEST, postUpload);
}

export default function* postSaga() {
  yield all([
    fork(watchpostUpload),
    fork(watchpostComment),
    fork(watchpostDelete),
    fork(watchpostEdit),
    fork(watchcommentDelete),
    fork(watchlikePost),
    fork(watchunlikePost),
    fork(watchnestedCommentDelete),
    fork(watchpostNestedComment),
  ]);
}
