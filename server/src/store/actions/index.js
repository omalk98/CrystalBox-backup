import actionTypes from './action-types';

// Login Actions
//= =============================================================================
export const authenticateUser = (token) => (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN,
    payload: token
  });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT
  });
};

// User Actions
//= =============================================================================
export const setUser = (user) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_USER,
    payload: user
  });
};

export const updateUserDetails = (userDetails) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_USER_DETAILS,
    payload: userDetails
  });
};

export const updatePersonalDetails = (personalDetails) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_PERSONAL_DETAILS,
    payload: personalDetails
  });
};

export const resetUser = () => (dispatch) => {
  dispatch({
    type: actionTypes.RESET_USER
  });
};

//= =============================================================================

// Theme Actions
//= =============================================================================

export const toggleTheme = (theme) => {
  if (theme === 'dark') {
    document.body.classList.add('body-light');
    document.body.classList.remove('body-dark');
    localStorage.setItem('c_box_theme', 'light');
  } else {
    document.body.classList.add('body-dark');
    document.body.classList.remove('body-light');
    localStorage.setItem('c_box_theme', 'dark');
  }
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_THEME,
      payload: theme
    });
  };
};

//= =============================================================================

// Clipboard Actions
//= =============================================================================

export const setClipboard = (text) => {
  let clipboardFail = false;
  if (!navigator?.clipboard?.writeText(text)) clipboardFail = true;
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_CLIPBOARD,
      payload: clipboardFail ? '' : text
    });
  };
};

//= =============================================================================
