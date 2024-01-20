import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { darken } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const auth = useSelector((state) => state.authenticated);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "var(--color-primary)",
            }}
        >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    APP NAME
                </Typography>
                {auth && (
                    <div className="navbar-actions">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Typography
                                    sx={{
                                        color: "var(--color-accent)",
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Typography
                                    sx={{
                                        color: "var(--color-accent)",
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    Profile
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </div>
                )}
                {!auth && (
                    <div className="navbar-actions">
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: "var(--color-secondary)",
                                borderWidth: "0.1rem",
                                "&:hover": {
                                    borderColor: darken("#0C7489", 0.1), // Adjust the factor (0.1) as needed
                                    borderWidth: "0.1rem",
                                },
                                color: "var(--color-secondary)",
                            }}
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "var(--color-accent)",
                                    fontSize: "0.8rem",
                                }}
                            >
                                Login
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            disableElevation
                            sx={{
                                backgroundColor: "var(--color-secondary)",
                                "&:hover": {
                                    backgroundColor: darken("#0C7489", 0.1), // Adjust the factor (0.1) as needed
                                },
                                color: "var(--color-secondary)",
                            }}
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "var(--color-accent)",
                                    fontSize: "0.8rem",
                                }}
                            >
                                Sign Up
                            </Typography>
                        </Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}
