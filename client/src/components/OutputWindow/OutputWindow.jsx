import { Box, IconButton, Typography } from "@mui/material";
import CustomSnackbar from "../Snackbar/Snackbar";
import { CodeBlock } from "react-code-blocks";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DoneIcon from "@mui/icons-material/Done";
import "./OutputWindow.css";
import { useState } from "react";
import MenuDropdown from "../MenuDropdown/MenuDropdown";

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
						showLineNumbers={context.showLineNumbers}
						wrapLines
					/>
				</div>
				<div className="output-further-actions">
					<MenuDropdown content={context.code} />
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
