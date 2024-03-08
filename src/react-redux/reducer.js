const initialState = {
  user: null,

  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true, // Assuming successful login means the user is authenticated
      };

    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
        isAuthenticated: false, // Update authentication status on logout
      };

    default:
      return state;
  }
};

export default authReducer;






