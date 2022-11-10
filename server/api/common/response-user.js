export function responseUser(user) {
  return {
    user_details: {
      isEditable: true,
      details: user.user_details
    },
    security_details: {
      isEditable: false,
      details: user.security_details
    },
    personal_details: {
      isEditable: true,
      details: user.personal_details,
      user_image: user.user_image
    }
  };
}

export function responseUserList(users) {
  return users.map((user) => ({
    id: user.security_details.id,
    name: `${user?.user_details?.first_name} ${user?.user_details?.last_name}`,
    username: user?.user_details?.username,
    roles: user?.server_details?.roles,
    s_lvl: user?.security_details?.security_level,
    activated: user?.server_details?.status?.activated ? 'Yes' : 'No',
    locked: user?.server_details?.status?.locked ? 'Yes' : 'No',
    email: user?.user_details?.email
  }));
}
