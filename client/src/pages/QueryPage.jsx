import { Button, Grid } from "@mui/material";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import PromptInput from "../components/PromptInput/PromptInput";
import Output from "../components/Output/Output";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";

export default function QueryPage() {
  const [showCodeEditor, setShowCodeEditor] = useState(true);

  const toggleEditor = () => {
    setShowCodeEditor(!showCodeEditor);
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "6rem" }}>
        <h1 style={{ textAlign: "center" }}>Monaco Editor Example</h1>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button variant="contained" color="info" onClick={toggleEditor}>
            Toggle Editor
          </Button>
        </div>

        <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={showCodeEditor ? 6 : 5}>
              {showCodeEditor ? (
                <CodeEditor defaultCode={"# Paste/Enter your code here"} />
              ) : (
                <PromptInput />
              )}
            </Grid>
            <Grid item xs={showCodeEditor ? 6 : 7}>
              <Output />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
