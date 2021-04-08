import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

//hydrate-> 서버사이드 렌더링
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        //  combineReducers() => 각각의 다른 reducer(함수)를 하나의 함수로 묶어준다.
        user,
        post,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
