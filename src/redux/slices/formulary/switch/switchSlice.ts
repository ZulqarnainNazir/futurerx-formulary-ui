import {createSlice} from "@reduxjs/toolkit";

const switchState: any = {
  configureSwitch: true,
  isLoading: false,
}
  

export const switchSlice = createSlice({
  name: "switch",
  initialState: switchState,
  reducers: {
    switchButton: (state,action) =>{
      state.configureSwitch = action.payload
    }
  }
});