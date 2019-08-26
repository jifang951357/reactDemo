import { ActionTypes } from './actions';

const defaultState = {
  currentUserInfo: {},
  currentUser: {},
};

export interface ActionType {
  type: string;
  user: UserTypes;
  userName?: string;
  password?: string;
}

export interface UserTypes {
  userId: string;
}

function onLoginSuccess(state: object, action: ActionType) {
  return {
    ...state,
    loginStatus: 'LOGIN_SUCCESS',
    currentUserId: action.user.userId,
    currentUser: action.user,
    currentUserInfo: action.user,
  };
}

export default function(state: object = defaultState, action: ActionType) {
   if (action.type === ActionTypes.LOGIN_SUCCESS) {
    return onLoginSuccess(state, action);
  } else if (
    action.type === ActionTypes.LOGOUT_SUCCESS
  ) {
    return defaultState;
  }

  return state;
}
