import produce from 'immer';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOAD_ME_REQUEST,
  LOAD_ME_SUCCESS,
  LOAD_ME_FAILURE,
} from './types';

export const initialState = {
  registerLoading: false, //회원가입
  registerDone: false,
  registerError: null,
  loginLoading: false, //로그인
  loginDone: false,
  loginError: null,
  logoutLoading: false, //로그아웃
  logoutDone: false,
  logoutError: null,
  loadMeLoading: false, //유저정보 가져오기
  loadMeDone: false,
  loadMeError: null,
  me: null,
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case REGISTER_REQUEST:
        draft.registerLoading = true;
        draft.registerDone = false;
        draft.registerError = null;
        break;
      case REGISTER_SUCCESS:
        draft.registerLoading = false;
        draft.registerDone = true;
        break;
      case REGISTER_FAILURE:
        draft.registerLoading = false;
        draft.registerError = action.error;
        break;
      case LOGIN_REQUEST:
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case LOGIN_SUCCESS:
        draft.loginDone = true;
        draft.me = action.data;
        draft.loginLoading = false;
        break;
      case LOGIN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.error;
        break;
      case LOGOUT_REQUEST:
        draft.logoutLoading = true;
        draft.logoutDone = false;
        draft.logoutError = null;
        break;
      case LOGOUT_SUCCESS:
        draft.logoutDone = true;
        draft.me = null;
        draft.logoutLoading = false;
        break;
      case LOGOUT_FAILURE:
        draft.logoutLoading = false;
        draft.logoutError = action.error;
        break;
      case LOAD_ME_REQUEST:
        draft.loadMeLoading = true;
        draft.loadMeError = null;
        draft.loadMeDone = false;
        break;
      case LOAD_ME_SUCCESS:
        draft.loadMeLoading = false;
        draft.me = action.data;
        draft.loadMeDone = true;
        break;
      case LOAD_ME_FAILURE:
        draft.loadMeLoading = false;
        draft.loadMeError = action.error;
        break;
    }
  });
};

export default reducer;
