import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Typography } from "@mui/material";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

export default function MenuDropdown({ title, items, replaceTitle }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentSelection, setCurrentSelection] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                id="output-window-further-action-btn"
                aria-controls={open ? "menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon sx={{ fontSize: "0.7rem" }} />}
            >
                <Typography
                    sx={{
                        fontSize: "0.7rem",
                        display: "flex", // Set display to flex
                        alignItems: "center",
                        lineHeight: 1,
                    }}
                >
                    {replaceTitle && currentSelection
                        ? currentSelection
                        : title}
                </Typography>
            </Button>
            <StyledMenu
                id="output-window-further-action-menu"
                MenuListProps={{
                    "aria-labelledby": "output-window-further-action-btn",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {items.map((item, idx) => {
                    return (
                        <MenuItem
                            key={idx}
                            onClick={() => {
                                handleClose();
                                item.action();
                                setCurrentSelection(item.label);
                            }}
                            disableRipple
                        >
                            {item.icon}
                            <Typography sx={{ fontSize: "0.8rem" }}>
                                {item.label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </StyledMenu>
        </>
    );
}
