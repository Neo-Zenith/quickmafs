import { Box, Button, Typography } from "@mui/material";
import { darken } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HeroSection() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authenticated);
  return (
    <>
      <Box sx={{ marginTop: "5rem", marginBottom: "10rem" }}>
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
          The easiest tool for transforming math equations into embedded system
          code
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
          You have the math mojo, I have the spagetthi code. Perfect
          combination!
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            if (!auth) navigate("/signup");
            else navigate("/query");
          }}
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
