import { useState } from "react";
import { Input } from "@mui/base/Input";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import QueryButtons from "../QueryButtons/QueryButtons";
import { useDispatch } from "react-redux";
import "./PromptInput.css";

export default function PromptInput() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFileUpload = (e) => {
    if (e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = "upload.png";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const url = "http://localhost:5000/image-to-expression";
    dispatch({ type: "SET_LOADING", payload: true });
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log("Query success:", data);
        setInputValue(data.result[0].generated_text);
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((error) => {
        console.error("Error fetching response:", error);
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };

  const handleSubmit = (e) => {
    if (inputValue.trim() === "") {
      setError("Please enter a value");
      return;
    }

    // Perform further validation or submit the form
    const url = "http://localhost:5000/openai";
    const payload = {
      language: "",
      content: inputValue.trim(),
      type: "exp",
    };
    console.log("Payload:", payload);

    dispatch({ type: "SET_LOADING", payload: true });
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Convert the data to JSON format
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log("Query success:", data);
        dispatch({
          type: "DISPLAY_CODE_OUTPUT",
          payload: {
            code: data.response.code,
            language: "c",
          },
        });
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((error) => {
        console.error("Error fetching response:", error);
        dispatch({ type: "SET_LOADING", payload: false });
      });

    // Reset the input value and error state
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
        value={inputValue}
        error={error}
        onChange={handleInputChange}
        slotProps={{ input: { className: "prompt-input" } }}
        placeholder="Enter your prompt here…"
      />

      <Button variant="contained" component="label">
        Upload Image
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>

      <QueryButtons handleClick={handleSubmit} containerWidth={"90%"} />
    </div>
  );
}
