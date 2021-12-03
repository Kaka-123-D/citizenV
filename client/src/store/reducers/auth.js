import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
    },
  },
});

const { loginSuccess } = auth.actions;

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    fetch("https://codersx-swagger.glitch.me/api/auth/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(loginSuccess(data)));
  };

export default auth.reducer;
