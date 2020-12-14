export const getLaSummaryFulfilled = (state, action) => {
  console.log("Reducer::getLaSummaryFulfilled");
  state.isLoading = false;
  console.log("getLaSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getLaSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe LA Summary Action = ", action);
  console.log("THe LA Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getLaSummaryRejected = (state, action) => {
  console.log("Reducer::getLaSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
