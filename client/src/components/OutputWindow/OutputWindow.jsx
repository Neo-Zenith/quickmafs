import { Box, IconButton, Typography } from "@mui/material";
import CustomSnackbar from "../Snackbar/Snackbar";
import { CodeBlock, vs2015 } from "react-code-blocks";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DoneIcon from "@mui/icons-material/Done";
import "./OutputWindow.css";
import { useState } from "react";
import MenuDropdown from "../MenuDropdown/MenuDropdown";
import SourceIcon from "@mui/icons-material/Source";
import ArticleIcon from "@mui/icons-material/Article";

export default function OutputWindow({ context }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(context.code).then(
      () => {
        console.log("Code copied to clipboard");
        setCopied(true);
      },
      (err) => {
        console.error("Unable to copy to clipboard", err);
      }
    );
  };

  const handleDownload = (extension, content) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = extension === "c" ? "code.c" : "code.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Box
        component="span"
        sx={{
          display: "block",
          p: 2,
          bgcolor: "#101010",
          color: "grey.300",
          border: "1px solid",
          borderColor: "grey.800",
          borderRadius: 2,
          fontSize: "0.875rem",
          marginTop: "2.85rem",
        }}
      >
        <div className="output-header">
          <Typography sx={{ fontSize: "1rem", fontWeight: 700 }}>
            Output
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={copyToClipboard}
            disabled={copied}
          >
            {copied ? (
              <div className="output-header-btn-content">
                <DoneIcon sx={{ fontSize: "1rem" }} />
                <Typography variant="body2">Done</Typography>
              </div>
            ) : (
              <div className="output-header-btn-content">
                <ContentPasteIcon sx={{ fontSize: "1rem" }} />
                <Typography variant="body2">Copy</Typography>
              </div>
            )}
          </IconButton>
        </div>

        <div className="output-content">
          <CodeBlock
            text={context.code}
            language={context.language}
            showLineNumbes={true}
            theme={vs2015}
            wrapLines
            customStyle={{
              maxHeight: "47vh",
            }}
          />
        </div>

        <div className="output-further-actions">
          <MenuDropdown
            title={"Export As"}
            items={[
              {
                label: "Text File (.txt)",
                action: () => handleDownload("txt", context.code),
                icon: <ArticleIcon />,
              },
              {
                label: "C Source Code (.c)",
                action: () => handleDownload("c", context.code),
                icon: <SourceIcon />,
              },
            ]}
          />
        </div>
      </Box>

      <CustomSnackbar
        message="Code copied!"
        isOpen={copied}
        onClose={() => setCopied(false)}
      />
    </>
  );
}
