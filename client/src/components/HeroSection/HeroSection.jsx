import { Box, Button, Typography } from "@mui/material";
import { darken } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import herosection from "../../static/herosection.gif";

export default function HeroSection() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authenticated);
  return (
    <div style={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5rem",
          marginBottom: "10rem",
          width: "50%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginLeft: "10rem",
            width: "fit-content",
            fontFamily: "Roboto",
            fontWeight: 600,
            letterSpacing: "0.2rem",
            marginTop: "15rem",
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
            boxSizing: "border-box",
            marginTop: "1.5rem",
            backgroundColor: "var(--color-secondary)",
            "&:hover": {
              backgroundColor: darken("#0C7489", 0.1), // Adjust the factor (0.1) as needed
            },
            maxWidth: "max(70%, 20rem)",
          }}
        >
          <Typography>Try Now</Typography>
        </Button>
      </Box>
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "80%",
            height: "fit-content",
            marginTop: "10rem",
            boxShadow: "0px 0px 13px 3px rgba(17,157,164,0.71)",
          }}
        >
          <img
            src={herosection}
            style={{ width: "100%", height: "fit-content" }}
          />
        </Box>
      </div>
    </div>
  );
}
