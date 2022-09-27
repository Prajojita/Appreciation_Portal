import { createSlice } from "@reduxjs/toolkit";
export const appReducer = createSlice({
  name: "appReducer",
  initialState: {
    selectedNavIndex: 0,
  },
  reducers: {
    //Navigation related reducer
    setSelectedNavIndex: (state, action) => {
      state.selectedNavIndex = action.payload || 0;
    },
  },
});


export const { setSelectedNavIndex } = appReducer.actions;

export default appReducer.reducer;
