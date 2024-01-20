import { Box, Button, Typography } from "@mui/material";
import CustomTextField from "../TextField/TextField";
import { darken } from "@mui/material/styles";
import { useState } from "react";

export default function ProfileDetails() {
  const [updatable, setUpdatable] = useState(false);

  return (
    <>
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: "Roboto", fontWeight: 500, marginBottom: "1.5rem" }}
        >
          Profile Information
        </Typography>
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "1.5rem" }}
        >
          <CustomTextField label={"Name"} disabled={!updatable} />
          <CustomTextField label={"Email"} disabled={!updatable} />
          <CustomTextField label={"Password"} disabled={!updatable} />
        </div>
        <div
          style={{
            width: "fit-content",
            marginTop: "1.5rem",
            marginLeft: "auto",
          }}
        >
          <Button
            sx={{
              backgroundColor: "var(--color-secondary)",
              "&:hover": {
                backgroundColor: darken("#0C7489", 0.1), // Adjust the factor (0.1) as needed
              },
              padding: "0.5rem 1rem",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "var(--color-accent)", fontSize: "1rem" }}
            >
              Update
            </Typography>
          </Button>
        </div>
      </Box>
    </>
  );
}
