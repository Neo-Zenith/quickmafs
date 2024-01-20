import { Box, Typography } from "@mui/material";
import AboutCard from "./AboutCard";
import "./AboutSection.css";

export default function AboutSection() {
  const aboutContent = [
    {
      title: "1. Math Prompt",
      content:
        "Input your math prompt in plain English or supported programming languages.",
    },
    {
      title: "2. Generate",
      content:
        "Our system will process your input and return with the equivalent embedded system code of the language of your choice.",
    },
    {
      title: "3. Save Result",
      content:
        "Immediately use the generated code by either copying the code directly to clipboard or saving as file.",
    },
  ];

  return (
    <>
      <Box sx={{ marginTop: "5rem", marginBottom: "10rem" }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Roboto",
            fontWeight: 500,
            color: "var(--color-accent)",
            marginLeft: "10rem",
            marginBottom: "1.5rem",
          }}
        >
          How Does It Work?
        </Typography>
        <div className="about-cards">
          {aboutContent.map((card, index) => {
            return (
              <AboutCard
                key={index}
                content={card.content}
                title={card.title}
              ></AboutCard>
            );
          })}
        </div>
      </Box>
    </>
  );
}
