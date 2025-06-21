import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  profileImg: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setProfileImg: (state, action) => {
      state.profileImg = action.payload;
    },
  },
});

export const { setName, setProfileImg } = userSlice.actions;
export default userSlice.reducer;
