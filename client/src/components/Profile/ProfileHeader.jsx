import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function ProfileHeader() {
  const username = useSelector((state) => state.username);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="profile-header"
        style={{
          width: "10rem",
          heigth: "10rem",
        }}
      >
        <img
          src="https://picsum.photos/300/300"
          style={{ borderRadius: "50%", width: "100%" }}
        />
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <Typography variant="h6" sx={{ color: "var(--color-accent)" }}>
          {"Test User"}
        </Typography>
      </div>
    </Box>
  );
}
