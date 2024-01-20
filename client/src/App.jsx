import OutputWindow from "./components/OutputWindow/OutputWindow";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import { Grid } from "@mui/material";

function App() {
	return (
		<>
			<h1>Monaco Editor Example</h1>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<CodeEditor defaultCode={"# Paste/Enter your code here"} />
				</Grid>
				<Grid item xs={6}>
					<OutputWindow
						context={{
							code: "const add = 1 + 2;\nvar i = add;",
							language: "javascript",
							showLineNumbers: true,
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
}

export default App;
