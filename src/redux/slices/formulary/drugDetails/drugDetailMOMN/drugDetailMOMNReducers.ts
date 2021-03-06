export const getMOMNSummaryFulfilled = (state, action) => {
  console.log("Reducer::getMOMNSummaryFulfilled");
  state.isLoading = false;
  console.log("getMOMNSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getMOMNSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe MOMN Summary Action = ", action);
  console.log("THe MOMN Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getMOMNSummaryRejected = (state, action) => {
  console.log("Reducer::getMOMNSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postMOListFulfilled = (state, action) => {
  console.log("Reducer::postMOListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postMOListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postMOListRejected = (state, action) => {
  console.log("Reducer::postMOListRejected");
  state.isLoading = false;
  state.applyData = {};
};

export const postReplaceDrugFulfilled = (state, action) => {
  console.log("Reducer::postReplaceDrugFulfilled");
  state.isLoading = false;
  console.log(action);
  if (action.payload) {
    console.log("postReplaceDrugFulfilled: Payload invalid");
    return;
  }
  const data = action.payload;
  state.data = data;
};

export const postReplaceDrugRejected = (state, action) => {
  console.log("Reducer::postReplaceDrugRejected");
  state.isLoading = false;
  state.data = {};
};
