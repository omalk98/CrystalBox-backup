const ClipboardReducer = (state = '', action = null) => {
  switch (action.type) {
    case 'SET_CLIPBOARD':
      return action.payload;
    default:
      return state;
  }
};

export default ClipboardReducer;
