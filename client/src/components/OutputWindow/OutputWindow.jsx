import { Box, Typography } from "@mui/material";
import { CodeBlock, CopyBlock } from "react-code-blocks";
import "./OutputWindow.css";

export default function OutputWindow({ context }) {
    return (
        <>
            <Box
                component="span"
                sx={{
                    display: "block",
                    p: 1,
                    m: 1,
                    bgcolor: (theme) =>
                        theme.palette.mode === "dark" ? "#101010" : "#fff",
                    color: (theme) =>
                        theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                    border: "1px solid",
                    borderColor: (theme) =>
                        theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                    borderRadius: 2,
                    fontSize: "0.875rem",
                }}
            >
                <Typography sx={{ fontSize: "1rem", fontWeight: 700 }}>
                    Output
                </Typography>
                <div className="output-content">
                    <CodeBlock
                        text={context.code}
                        language={context.language}
                        showLineNumbers={context.showLineNumbers}
                        wrapLines
                    />
                </div>
            </Box>
        </>
    );
}
