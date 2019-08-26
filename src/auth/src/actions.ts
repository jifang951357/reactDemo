const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'AUTH/LOGOUT_SUCCESS';

const ActionTypes = {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
};

/**
 * 登录成功
 *
 * @param {object} user
 * @param {string} currentDeptId
 * @param {string} retain
 * @returns
 */
function loginSuccess(user: object) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

const ActionCreators = {
  loginSuccess,
  logoutSuccess,
};

export { ActionTypes, ActionCreators };
