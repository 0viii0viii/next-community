import produce from 'immer';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './types';

export const initialState = {
  registerLoading: false, //회원가입
  registerDone: false,
  registerError: null,
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
    }
  });
};

export default reducer;
