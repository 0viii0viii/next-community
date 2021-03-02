import produce from 'immer';
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
} from './types';

export const initialState = {
  postUploadDone: false,
  postUploadError: null,
  postUploadLoading: false,
  postCommentDone: false,
  postCommentError: null,
  postCommentLoading: false,
  postDetailloadDone: false,
  postDetailloadError: null,
  postDetailloadLoading: false,
  postLoadDone: false,
  postLoadError: null,
  postLoadLoading: false,
  mypostLoadDone: false,
  mypostLoadError: null,
  mypostLoadLoading: false,
  postEditDone: false,
  postEditError: null,
  postEditLoading: false,
  postDeleteDone: false,
  postDeleteError: null,
  postDeleteLoading: false,
  categoryLoadDone: false,
  categoryLoadError: null,
  categoryLoadLoading: false,
  postSearchLoadLoading: false,
  postSearchLoadDone: false,
  postSearchLoadError: null,
  posts: [],
  categoryLoadPosts: [],
  postDetail: [],
  myposts: [],
  searchLoadPosts: [],
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case POST_LOAD_REQUEST:
        draft.postLoadLoading = true;
        draft.postDeleteDone = false;
        draft.postLoadDone = false;
        draft.postEditDone = false;
        draft.postLoadError = null;
        break;
      case POST_LOAD_SUCCESS:
        draft.postLoadLoading = false;
        draft.posts = action.data;
        draft.postLoadDone = true;
        break;
      case POST_LOAD_FAILURE:
        draft.postLoadLoading = false;
        draft.postLoadDone = false;
        draft.postLoadError = action.error;
        break;
      case POST_UPLOAD_REQUEST:
        draft.postUploadLoading = true;
        draft.postUploadDone = false;
        draft.postUploadError = null;
        break;
      case POST_UPLOAD_SUCCESS:
        draft.postUploadLoading = false;
        draft.posts.unshift(action.payload);
        draft.postUploadDone = true;
        break;
      case POST_UPLOAD_FAILURE:
        draft.postUploadLoading = false;
        draft.postUploadDone = false;
        draft.postUploadError = action.error;
        break;
      case POST_COMMENT_REQUEST:
        draft.postCommentLoading = true;
        draft.postCommentDone = false;
        draft.postCommentError = null;
        break;
      case POST_COMMENT_SUCCESS:
        const post = draft.posts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.postCommentLoading = false;
        draft.postCommentDone = true;
        break;
      case POST_COMMENT_FAILURE:
        draft.postCommentLoading = false;
        draft.postCommentDone = false;
        draft.postCommentError = action.error;
        break;

      case CATEGORY_POST_LOAD_REQUEST:
        draft.categoryLoadLoading = true;
        draft.categoryLoadDone = false;
        draft.categoryLoadError = null;
        break;
      case CATEGORY_POST_LOAD_SUCCESS:
        draft.categoryLoadLoading = false;
        draft.categoryLoadPosts = action.data;
        draft.categoryLoadDone = true;
        break;
      case CATEGORY_POST_LOAD_FAILURE:
        draft.categoryLoadLoading = false;
        draft.categoryLoadDone = false;
        draft.categoryLoadError = action.error;
        break;
      case POST_DETAIL_LOAD_REQUEST:
        draft.postDetailLoadLoading = true;
        draft.postDetailLoadDone = false;
        draft.postDetailLoadError = null;
        break;
      case POST_DETAIL_LOAD_SUCCESS:
        draft.postDetailLoadLoading = false;
        draft.postDetail = action.data;
        draft.postLoadDone = true;
        break;
      case POST_DETAIL_LOAD_FAILURE:
        draft.postDetailLoadLoading = false;
        draft.postDetailLoadDone = false;
        draft.postDetailLoadError = action.error;
        break;
      case POST_DELETE_REQUEST:
        draft.postDeleteLoading = true;
        draft.postDeleteDone = false;
        draft.postDeleteError = null;
        break;
      case POST_DELETE_SUCCESS:
        draft.postDeleteLoading = false;
        draft.posts = draft.posts.filter((v) => v.id !== action.data.PostId);
        draft.postDeleteDone = true;
        break;
      case POST_DELETE_FAILURE:
        draft.postDeleteLoading = false;
        draft.postDeleteDone = false;
        draft.postDeleteError = action.error;
        break;
      case POST_EDIT_REQUEST:
        draft.postEditLoading = true;
        draft.postEditDone = false;
        draft.postEditError = null;
        break;
      case POST_EDIT_SUCCESS:
        draft.postEditLoading = false;
        draft.postDetail = action.data;
        draft.postEditDone = true;
        break;
      case POST_EDIT_FAILURE:
        draft.postEditLoading = false;
        draft.postEditDone = false;
        draft.postEditError = action.error;
        break;
      case MYPOST_LOAD_REQUEST:
        draft.mypostLoadLoading = true;
        draft.mypostLoadDone = false;
        draft.mypostLoadError = null;
        break;
      case MYPOST_LOAD_SUCCESS:
        draft.mypostLoadLoading = false;
        draft.myposts = action.data;
        draft.mypostLoadDone = true;
        break;
      case MYPOST_LOAD_FAILURE:
        draft.mypostLoadLoading = false;
        draft.mypostLoadDone = false;
        draft.mypostLoadError = action.error;
        break;
      case POST_SEARCH_LOAD_REQUEST:
        draft.postSearchLoadLoading = true;
        draft.postSearchLoadDone = false;
        draft.postSearchLoadError = null;
        break;
      case POST_SEARCH_LOAD_SUCCESS:
        draft.postSearchLoadLoading = false;
        draft.searchLoadPosts = action.data;
        draft.postSearchLoadDone = true;
        break;
      case POST_SEARCH_LOAD_FAILURE:
        draft.postSearchLoadLoading = false;
        draft.postSearchLoadDone = false;
        draft.postSearchLoadError = action.error;
        break;
    }
  });
};

export default reducer;
