import { Box, TextField } from "@mui/material";
import SignupForm from "../components/Forms/SignupForm";

export default function SignupPage() {
    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <SignupForm />
            </Box>
        </>
    );
}
