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
      <div style={{ marginTop: "5rem" }}>
        <div style={{ textAlign: "center" }}>
          <Button variant="contained" color="info" onClick={toggleEditor}>
            Toggle Editor
          </Button>
        </div>

        <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={showCodeEditor ? 6 : 5}>
              {showCodeEditor ? (
                <CodeEditor defaultLanguage={"python"} />
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
