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
