const ThemeReducer = (
  state = localStorage.getItem('c_box_theme') || 'dark',
  action = null
) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return action.payload === 'dark' ? 'light' : 'dark';
    default:
      return state;
  }
};

export default ThemeReducer;
