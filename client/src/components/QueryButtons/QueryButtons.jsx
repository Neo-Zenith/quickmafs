import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function QueryButtons({ handleClick }) {
  const loading = useSelector((state) => state.loading);

  return (
    <Stack
      width="100%"
      justifyContent="space-between"
      direction="row"
      marginTop={1.5}
    >
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          handleClick();
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Generate"}
      </Button>
    </Stack>
  );
}
