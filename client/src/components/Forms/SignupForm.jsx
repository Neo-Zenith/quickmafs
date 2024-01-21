import { Box, Button, Typography } from "@mui/material";
import CustomTextField from "../TextField/TextField";
import { darken } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated, setUserDb } from "../../store/actions";

export default function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");
  const userDb = useSelector((state) => state.userDb);
  const [error, setError] = useState({});

  const validate = () => {
    let newError = {};

    // Validate email
    if (!email) {
      newError = { ...newError, email: "Email is required" };
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError = { ...newError, email: "Invalid email format" };
    } else if (Object.keys(userDb).includes(email.toLowerCase)) {
      newError = { ...newError, email: "Email already exist" };
    }

    // Validate password
    if (!password) {
      newError = { ...newError, password: "Password is required" };
    } else if (password.length < 6) {
      newError = {
        ...newError,
        password: "Password must be at least 6 characters",
      };
    }

    // Validate name
    if (!name) {
      newError = { ...newError, name: "Name is required" };
    }

    // Validate confirmed password
    if (password !== cfmPassword) {
      newError = { ...newError, cfmPassword: "Passwords do not match" };
    }

    // Update the error state
    setError(newError);

    // Return true if there are no errors, otherwise return false
    return Object.keys(newError).length === 0;
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
            SIGN UP
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
            Already have an account?&nbsp;&nbsp;
            <a href="/login" style={{ color: "var(--color-tertiary)" }}>
              Login now
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
            required
            error={error.email}
            helperText={
              error.email && (
                <Typography variant="subtitle2" sx={{ color: "red" }}>
                  {error.email}
                </Typography>
              )
            }
          />
          <CustomTextField
            label={"Name"}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            error={error.name}
            helperText={
              error.name && (
                <Typography variant="subtitle2" sx={{ color: "red" }}>
                  {error.name}
                </Typography>
              )
            }
          />
          <CustomTextField
            label={"Password"}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            error={error.password}
            helperText={
              error.password && (
                <Typography variant="subtitle2" sx={{ color: "red" }}>
                  {error.password}
                </Typography>
              )
            }
          />
          <CustomTextField
            label={"Confirm Password"}
            type="password"
            onChange={(e) => {
              setCfmPassword(e.target.value);
            }}
            required
            error={error.cfmPassword}
            helperText={
              error.cfmPassword && (
                <Typography variant="subtitle2" sx={{ color: "red" }}>
                  {error.cfmPassword}
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
                const key = email.toLowerCase();
                dispatch(
                  setUserDb({ ...userDb, [key]: { name, email, password } })
                );
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
              SIGN UP
            </Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
}
