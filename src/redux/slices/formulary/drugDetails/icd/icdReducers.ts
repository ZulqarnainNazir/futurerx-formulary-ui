export const getICDSummaryFulfilled = (state, action) => {
  console.log("Reducer::getICDSummaryFulfilled");
  state.isLoading = false;
  console.log("getICDSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getICDSummaryFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe ICD Summary Action = ", action);
  console.log("THe ICD Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getICDSummaryRejected = (state, action) => {
  console.log("Reducer::getICDSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
