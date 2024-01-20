import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";

export default function CustomSnackbar({ isOpen, message, onClose }) {
	const [open, setOpen] = useState(isOpen);

	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
		onClose();
	};

	return (
		<div>
			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
				message={message}
			/>
		</div>
	);
}
