import CodeEditor from "../components/CodeEditor/CodeEditor";
import PromptInput from "../components/PromptInput/PromptInput";
import { Grid } from "@mui/material";
import Output from "../components/Output/Output";

export default function QueryPage() {
	return (
		<>
			<h1 style={{ textAlign: "center" }}>Monaco Editor Example</h1>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					{/* <CodeEditor defaultCode={"# Paste/Enter your code here"} /> */}
					<PromptInput />
				</Grid>
				<Grid item xs={6}>
					<Output />
				</Grid>
			</Grid>
		</>
	);
}
