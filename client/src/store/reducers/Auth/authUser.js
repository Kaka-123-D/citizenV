import { createSlice } from "@reduxjs/toolkit";

// khởi tạo state
const initialState = {
  accessToken: null,
  refreshToken: null,
};

const refreshAccessToken = () => {
  setTimeout(() => {
        fetch("http://localhost:8080/refreshToken", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: initialState.refreshToken,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 1) {
              initialState.accessToken = data.accessToken;
              refreshAccessToken();
            }
          });
      }, 1800000);
      
}

// tạo slice auth chứa actions và reducer cho user
const auth = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      alert('Login successful');
      refreshAccessToken();
    },
    loginFailure(state, action) {
      alert('Login failed');
    }
  },
});

// lấy hàm loginSuccess và loginFailure trong slice để sau khi fetch data thì sử dụng
const { loginSuccess, loginFailure } = auth.actions;


// gửi username với password lên server để xác thực
// nếu status của res trả về là 1 thì gọi hàm loginSuccess.
// ngược lại gọi hàm loginFailure
export const login =
  ({ username, password }) =>
  async (dispatch) => {
    fetch( "http://localhost:8080/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.status === 1
          ? dispatch(loginSuccess(data))
          : dispatch(loginFailure(data));
      });
  };

export default auth.reducer;
