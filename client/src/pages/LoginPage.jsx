import { Box } from "@mui/material";
import SignupForm from "../components/Forms/SignupForm";
import LoginForm from "../components/Forms/LoginForm";

export default function LoginPage() {
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
                <LoginForm />
            </Box>
        </>
    );
}
