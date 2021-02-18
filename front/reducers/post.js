import produce from 'immer';
import {
  CATEGORY_POST_LOAD_FAILURE,
  CATEGORY_POST_LOAD_REQUEST,
  CATEGORY_POST_LOAD_SUCCESS,
  POST_DETAIL_LOAD_FAILURE,
  POST_DETAIL_LOAD_REQUEST,
  POST_DETAIL_LOAD_SUCCESS,
  POST_LOAD_FAILURE,
  POST_LOAD_REQUEST,
  POST_LOAD_SUCCESS,
  POST_UPLOAD_FAILURE,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
} from './types';

export const initialState = {
  postUploadDone: false,
  postUploadError: null,
  postUploadLoading: false,
  postDetailloadDone: false,
  postDetailloadError: null,
  postDetailloadLoading: false,
  postLoadDone: false,
  postLoadError: null,
  postLoadLoading: false,
  categoryLoadDone: false,
  categoryLoadError: null,
  categoryLoadLoading: false,
  posts: [],
  categoryLoadPosts: [],
  postDetail: '',
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
        draft.posts = action.payload;
        draft.postUploadDone = true;
        break;
      case POST_UPLOAD_FAILURE:
        draft.postUploadLoading = false;
        draft.postUploadDone = false;
        draft.postUploadError = action.error;
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
      case POST_LOAD_REQUEST:
        draft.postLoadLoading = true;
        draft.postLoadDone = false;
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
    }
  });
};

export default reducer;
