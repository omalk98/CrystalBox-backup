export default function responseUser(user) {
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
