import { Box, Button, Typography } from "@mui/material";
import CustomTextField from "../TextField/TextField";
import { darken } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticated } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userDb = useSelector((state) => state.userDb);

  const validate = () => {
    if (
      Object.keys(userDb).includes(email) &&
      userDb[email].password === password
    ) {
      return true;
    } else {
      setError(true);
    }
  };

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
            LOGIN
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
            Don't have an account?&nbsp;&nbsp;
            <a href="/signup" style={{ color: "var(--color-tertiary)" }}>
              Signup now
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
          <CustomTextField
            label={"Email address"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={error}
            helperText={
              error && (
                <Typography variant="subtitle2" sx={{ color: "red" }}>
                  Incorrect email and/or password.
                </Typography>
              )
            }
            required
          />
          <CustomTextField
            label={"Password"}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            error={error}
            helperText={
              error && (
                <Typography variant="subtitle2" sx={{ color: "red" }}>
                  Incorrect email and/or password.
                </Typography>
              )
            }
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
            onClick={() => {
              if (validate()) {
                dispatch(setAuthenticated(true));
                navigate("/query");
              }
            }}
          >
            <Typography
              sx={{
                color: "var(--color-accent)",
                fontSize: "1rem",
              }}
            >
              LOGIN
            </Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
}
