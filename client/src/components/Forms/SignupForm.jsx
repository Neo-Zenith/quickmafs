import { Box, Button, Typography } from "@mui/material";
import CustomTextField from "../TextField/TextField";
import { darken } from "@mui/material/styles";

export default function SignupForm() {
    return (
        <>
            <Box
                sx={{
                    width: "50%",
                    minWidth: "25rem",
                    marginLeft: "max(10%, 2rem)",
                    marginRight: "max(10%, 2rem)",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "2.5rem",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "0.4rem",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: "center",
                            fontFamily: "Roboto",
                            fontWeight: 600,
                            color: "var(--color-accent)",
                        }}
                    >
                        SIGN UP
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            textAlign: "center",
                            fontFamily: "Roboto",
                            fontWeight: 300,
                            color: "var(--color-accent)",
                        }}
                    >
                        Already have an account?&nbsp;&nbsp;
                        <a
                            href="/login"
                            style={{ color: "var(--color-tertiary)" }}
                        >
                            Login now
                        </a>
                        .
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "1rem",
                    }}
                >
                    <CustomTextField label={"Email address"} />
                    <CustomTextField label={"Name"} />
                    <CustomTextField label={"Password"} type="password" />
                    <CustomTextField
                        label={"Confirm Password"}
                        type="password"
                    />
                </Box>
                <Box sx={{ marginLeft: "auto" }}>
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{
                            backgroundColor: "var(--color-secondary)",
                            "&:hover": {
                                backgroundColor: darken("#0C7489", 0.1), // Adjust the factor (0.1) as needed
                            },
                            color: "var(--color-secondary)",
                            padding: "0.5rem 1.5rem",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "var(--color-accent)",
                                fontSize: "1rem",
                            }}
                        >
                            SIGN UP
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </>
    );
}
