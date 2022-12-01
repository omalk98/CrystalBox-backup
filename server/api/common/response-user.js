export function responseUser(user, user_details) {
  return {
    user_details: {
      isEditable: true,
      details: {
        first_name: user_details.first_name,
        last_name: user_details.last_name,
        username: user.username,
        email: user.email
      }
    },
    security_details: {
      isEditable: false,
      details: {
        id: user._id
      }
    },
    personal_details: {
      isEditable: true,
      details: {
        date_of_birth: user_details.date_of_birth,
        phone: user_details.phone,
        address: user_details.address
      },
      user_image: user_details.image
    }
  };
}

export function detailedResponseUser(user, user_details) {
  const basic_details = responseUser(user, user_details);
  return {
    ...basic_details,
    server_details: {
      isEditable: false,
      details: {
        roles: user.roles,
        status: user.status,
        date_joined: user.date_joined,
        last_login: user.last_login
      }
    }
  };
}

export function responseUserList(users) {
  return users.map((user) => ({
    id: user._id,
    username: user.username,
    roles: user.roles,
    activated: user.status.activated ? 'Yes' : 'No',
    locked: user.status.locked ? 'Yes' : 'No',
    email: user.email
  }));
}

export const NoExtraUser_ID = {
  __v: 0,
  'status._id': 0,
  'last_login._id': 0
};

export const NoExtraUserDetails_ID = {
  __v: 0,
  'address.id': 0
};
