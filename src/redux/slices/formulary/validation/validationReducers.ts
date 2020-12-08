export const actionFulfilled = (state, action) => {
  state.isLoading = false;
  if(action.payload.result === undefined || !Array.isArray(action.payload.result.validations) || (action.payload.result.validations.length === 0)) {
    return;
  }
  state.validationData = action.payload.result;;
}

export const actionRejected = (state, action) => {
  state.isLoading = false;
  state.validationData = {};
}