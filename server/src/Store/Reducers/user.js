const initialState = {
  user_details: {
    isEditable: false,
    details: {
      first_name: '',
      last_name: '',
      username: '',
      email: ''
    }
  },
  security_details: {
    isEditable: false,
    details: {
      id: '',
      security_level: ''
    }
  },
  personal_details: {
    isEditable: false,
    details: {
      date_of_birth: '',
      phone: '',
      address: {
        street: '',
        city: '',
        province: '',
        country: '',
        postal_code: ''
      }
    },
    user_image: ''
  }
};

const UserReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'SET_USER':
      return action?.payload || initialState;
    case 'UPDATE_USER_DETAILS':
      return {
        user_details: {
          isEditable: true,
          details: action.payload
        },
        security_details: state.security_details,
        personal_details: state.personal_details
      };
    case 'UPDATE_PERSONAL_DETAILS':
      return {
        user_details: state.user_details,
        security_details: state.security_details,
        personal_details: {
          isEditable: true,
          details: action.payload,
          user_image: state.personal_details.user_image
        }
      };
    case 'RESET_USER':
      return initialState;
    default:
      return state;
  }
};

export default UserReducer;
