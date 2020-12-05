export const getActionFulfilled = (state, action) => {
  console.log("*** App Reducer - getActionFulfilled");
  console.log(action);
  console.log(state);
  console.log("- - - - - - - - - - - - - - -");
  // Response stored in the redux store.
  // state.data = data;
  // state.FL_LIST = data;
};

export const getActionRejected = (state, action) => {
  console.log("*** App Reducer - getActionRejected");
  console.log(action);
  console.log(state);
  console.log("- - - - - - - - - - - - - - -");

};
