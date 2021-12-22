import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: null,
};

const message = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessageError(state, action) {
      state.text = action.payload;
    },
  },
});

export const {setMessageError} = message.actions;

export const setAlertError = (text) => (dispatch) => {
  dispatch(setMessageError(text));
}

export default message.reducer;
