import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function QueryButtons({ handleClick, containerWidth }) {
  const loading = useSelector((state) => state.loading);

  return (
    <Stack
      justifyContent="space-between"
      direction="row"
      width={containerWidth}
      marginTop={2}
    >
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          handleClick();
        }}
        disabled={loading}
      >
        Generate
      </Button>

      <Button variant="contained" color="error" disabled={!loading}>
        Cancel
      </Button>
    </Stack>
  );
}
