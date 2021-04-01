import produce from 'immer';
import {
  COMMENT_DELETE_FAILURE,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  DELETE_NESTED_COMMENT_FAILURE,
  DELETE_NESTED_COMMENT_REQUEST,
  DELETE_NESTED_COMMENT_SUCCESS,
  EDIT_NESTED_COMMENT_FAILURE,
  EDIT_NESTED_COMMENT_REQUEST,
  EDIT_NESTED_COMMENT_SUCCESS,
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
} from './types';

export const initialState = {
  postUploadDone: false,
  postUploadError: null,
  postUploadLoading: false,
  postCommentDone: false,
  postCommentError: null,
  postCommentLoading: false,
  postEditDone: false,
  postEditError: null,
  postEditLoading: false,
  postDeleteDone: false,
  postDeleteError: null,
  postDeleteLoading: false,
  commentDeleteDone: false,
  commentDeleteError: null,
  commentDeleteLoading: false,
  likePostDone: false,
  likePostError: null,
  likePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  unlikePostLoading: false,
  postNestedCommentLoading: false,
  postNestedCommentDone: false,
  postNestedCommentError: null,
  editNestedCommentLoading: false,
  editNestedCommentDone: false,
  editNestedCommentError: null,
  deleteNestedCommentLoading: false,
  deleteNestedCommentDone: false,
  deleteNestedCommentError: null,
  posts: [],
  searchLoadPosts: [],
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
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
        draft.postCommentLoading = false;
        draft.postCommentDone = true;
        break;
      case POST_COMMENT_FAILURE:
        draft.postCommentLoading = false;
        draft.postCommentDone = false;
        draft.postCommentError = action.error;
        break;
      case COMMENT_DELETE_REQUEST:
        draft.commentDeleteLoading = true;
        draft.commentDeleteDone = false;
        draft.commentDeleteError = null;
        break;
      case COMMENT_DELETE_SUCCESS:
        draft.commentDeleteLoading = false;
        draft.commentDeleteDone = true;
        break;
      case COMMENT_DELETE_FAILURE:
        draft.commentDeleteLoading = false;
        draft.commentDeleteDone = false;
        draft.commentDeleteError = action.error;
        break;
      case POST_NESTED_COMMENT_REQUEST:
        draft.postNestedCommentLoading = true;
        draft.postNestedCommentDone = false;
        draft.postNestedCommentError = null;
        break;
      case POST_NESTED_COMMENT_SUCCESS:
        draft.postNestedCommentLoading = false;
        draft.postNestedCommentDone = true;
        break;
      case POST_NESTED_COMMENT_FAILURE:
        draft.postNestedCommentLoading = false;
        draft.postNestedCommentDone = false;
        draft.postNestedCommentError = action.error;
        break;
      case EDIT_NESTED_COMMENT_REQUEST:
        draft.editNestedCommentLoading = true;
        draft.editNestedCommentDone = false;
        draft.editNestedCommentError = null;
        break;
      case EDIT_NESTED_COMMENT_SUCCESS:
        draft.editNestedCommentLoading = false;
        draft.editNestedCommentDone = true;
        break;
      case EDIT_NESTED_COMMENT_FAILURE:
        draft.editNestedCommentLoading = false;
        draft.editNestedCommentDone = false;
        draft.editNestedCommentError = action.error;
        break;
      case DELETE_NESTED_COMMENT_REQUEST:
        draft.deleteNestedCommentLoading = true;
        draft.deleteNestedCommentDone = false;
        draft.deleteNestedCommentError = null;
        break;
      case DELETE_NESTED_COMMENT_SUCCESS:
        draft.deleteNestedCommentLoading = false;
        draft.deleteNestedCommentDone = true;
        break;
      case DELETE_NESTED_COMMENT_FAILURE:
        draft.deleteNestedCommentLoading = false;
        draft.deleteNestedCommentDone = false;
        draft.deleteNestedCommentError = action.error;
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
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        // const post = draft.posts.find((v) => v.id === action.data.PostId);
        // post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostDone = false;
        draft.likePostError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS:
        // const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        // post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostDone = false;
        draft.unlikePostError = action.error;
        break;
    }
  });
};

export default reducer;
