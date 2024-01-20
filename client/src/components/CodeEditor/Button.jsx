import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";

export default function CodeEditorButton({ handleClick }) {
	const [loading, setLoading] = useState(false);

	return (
		<Stack justifyContent="space-between" direction="row" marginTop={2}>
			<Button
				variant="contained"
				color="success"
				onClick={() => {
					setLoading(true);
					handleClick();
				}}
			>
				Generate
			</Button>

			<Button variant="contained" color="error" disabled={!loading}>
				Cancel
			</Button>
		</Stack>
	);
}
