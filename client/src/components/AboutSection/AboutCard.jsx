import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
        •
    </Box>
);

export default function AboutCard({ title, content }) {
    return (
        <Card sx={{ flex: 1, backgroundColor: "var(--color-secondary)" }}>
            <CardContent>
                <Typography
                    variant="h5"
                    sx={{
                        color: "var(--color-accent)",
                        fontWeight: 500,
                        fontFamily: "Roboto",
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: "var(--color-accent)",
                        fontWeight: 300,
                        fontFamily: "Roboto",
                        marginTop: "1.5rem",
                    }}
                >
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
}
