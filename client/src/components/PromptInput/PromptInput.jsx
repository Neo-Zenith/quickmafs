import { useState } from "react";
import { Input } from "@mui/base/Input";
import "./PromptInput.css";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import QueryButtons from "../QueryButtons/QueryButtons";

export default function PromptInput() {
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      setError("Please enter a value");
      return;
    }

    // Perform further validation or submit the form

    // Reset the input value and error state
    setInputValue("");
    setError("");
  };

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "0.5rem",
				width: "100%",
				height: "100%",
				paddingLeft: "1rem",
				justifyContent: "center",
			}}
		>
			<Typography sx={{ fontSize: "3rem", fontWeight: 700 }}>
				Text Input
			</Typography>

			<Input
				slotProps={{ input: { className: "prompt-input" } }}
				placeholder="Enter your prompt here…"
			/>
			<QueryButtons />
		</div>
	);
}
