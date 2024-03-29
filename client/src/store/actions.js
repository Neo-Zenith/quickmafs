export const setUsername = (username) => ({
  type: "SET_USERNAME",
  payload: username,
});

export const setAuthenticated = (authenticated) => ({
  type: "SET_AUTHENTICATED",
  payload: authenticated,
});

export const displayCodeOutput = (codeOutput) => ({
  type: "DISPLAY_CODE_OUTPUT",
  payload: codeOutput,
});

export const setLoading = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading,
});

export const setUserDb = (userDb) => ({
  type: "SET_USER_DB",
  payload: userDb,
});
