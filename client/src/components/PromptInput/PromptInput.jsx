import { useState } from "react";
import TextField from "@mui/material/TextField";

const PromptInput = () => {
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
    <form onSubmit={handleSubmit}>
      <TextField
        error={!!error}
        helperText={error}
        value={inputValue}
        onChange={handleInputChange}
        label="Input"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PromptInput;
