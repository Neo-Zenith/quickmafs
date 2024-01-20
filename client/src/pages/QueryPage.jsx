import { Grid } from "@mui/material";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import PromptInput from "../components/PromptInput/PromptInput";
import Output from "../components/Output/Output";
import { useState } from "react";

const myMap = new Map([
  ["code", [6, 6]],
  ["text", [5, 7]],
]);

export default function QueryPage() {
  const [type, setType] = useState("text");
  const [length1, length2] = myMap.get(type);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Monaco Editor Example</h1>

      <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={length1}>
            {/* <CodeEditor defaultCode={"# Paste/Enter your code here"} /> */}
            <PromptInput />
          </Grid>
          <Grid item xs={length2}>
            <Output />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
