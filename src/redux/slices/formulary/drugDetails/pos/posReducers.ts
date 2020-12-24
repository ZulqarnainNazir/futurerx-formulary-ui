export const getPOSSummaryFulfilled = (state, action) => {
  console.log("Reducer::getPOSSummaryFulfilled");
  state.isLoading = false;
  console.log("getPOSSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPOSSummaryFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe POS Summary Action = ", action);
  console.log("THe POS Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getPOSSummaryRejected = (state, action) => {
  console.log("Reducer::getPOSSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const getPOSSettingsFulfilled = (state, action) => {
  console.log("Reducer::getPOSSettingsFulfilled");
  state.isLoading = false;
  console.log("getPOSSettingsFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPOSSettingsFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe POS Settings Action = ", action);
  console.log("THe POS Settings Action Payload = ", action.payload);
  state.data = data;
};
export const getPOSSettingsRejected = (state, action) => {
  console.log("Reducer::getPOSSettingsRejected");
  state.isLoading = false;
  state.data = {};
};
