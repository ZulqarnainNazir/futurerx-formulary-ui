export const getPNSummaryFulfilled = (state, action) => {
  console.log("Reducer::getPNSummaryFulfilled");
  state.isLoading = false;
  console.log("getPNSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPNSummaryFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe PN Summary Action = ", action);
  console.log("THe PN Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getPNSummaryRejected = (state, action) => {
  console.log("Reducer::getPNSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
