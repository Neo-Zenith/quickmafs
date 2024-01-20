import { Box, Button, Typography } from "@mui/material";
import { darken } from "@mui/material/styles";

export default function HeroSection() {
    return (
        <>
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        marginLeft: "10rem",
                        width: "fit-content",
                        fontFamily: "Roboto",
                        fontWeight: 600,
                        letterSpacing: "0.2rem",
                        marginTop: "15rem",
                        maxWidth: "max(35%, 25rem)",
                        color: "var(--color-accent)",
                    }}
                >
                    The easiest tool for transforming math equations into
                    embedded system code
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        width: "fit-content",
                        marginLeft: "10rem",
                        marginTop: "1.5rem",
                        color: "var(--color-accent)",
                        fontFamily: "Roboto",
                        fontWeight: 300,
                    }}
                >
                    This is a slogan for our app. Please try it out yay thanks.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        marginLeft: "10rem",
                        width: "max(35%, 25rem)",
                        marginTop: "1.5rem",
                        backgroundColor: "var(--color-secondary)",
                        "&:hover": {
                            backgroundColor: darken("#0C7489", 0.1), // Adjust the factor (0.1) as needed
                        },
                    }}
                >
                    <Typography>Try Now</Typography>
                </Button>
            </Box>
        </>
    );
}
