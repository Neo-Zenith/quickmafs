import { Box, Button, Typography } from "@mui/material";
import { darken } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import herosection from "../../static/herosection.mp4";
import { useRef } from "react";

export default function HeroSection() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authenticated);
  const videoRef = useRef(null);

  const handleVideoEnded = () => {
    // Restart the video when it ends
    console.log(videoRef.current);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "98vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "35%",
          gap: "1.5rem",
          marginLeft: "5rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            width: "fit-content",
            fontFamily: "Roboto",
            fontWeight: 600,
            letterSpacing: "0.2rem",
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
            boxSizing: "border-box",
            backgroundColor: "var(--color-secondary)",
            "&:hover": {
              backgroundColor: darken("#0C7489", 0.1), // Adjust the factor (0.1) as needed
            },
            padding: "0.5rem 1.5rem",
            width: "fit-content",
          }}
        >
          <Typography>Try Now</Typography>
        </Button>
      </Box>

      <div
        style={{
          width: "65%",
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
            boxShadow: "0px 0px 13px 3px rgba(17,157,164,0.71)",
          }}
        >
          <video
            ref={videoRef}
            width="100%"
            height="100%"
            loop
            autoPlay
            controls={false}
          >
            <source src={herosection} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </div>
    </div>
  );
}
