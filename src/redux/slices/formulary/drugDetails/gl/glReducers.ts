export const getGLSummaryFulfilled = (state, action) => {
  console.log("Reducer::getGLSummaryFulfilled");
  state.isLoading = false;
  console.log("getGLSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getGLSummaryFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe GL Summary Action = ", action);
  console.log("THe GL Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getGLSummaryRejected = (state, action) => {
  console.log("Reducer::getGLSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
