import { Box } from "@mui/material";
import HistoryTable from "../components/History/HistoryTable";
import Navbar from "../components/Navbar/Navbar";

export default function HistoryPage() {
    return (
        <>
            <Navbar />
            <Box sx={{ margin: "0 10rem", marginTop: "10rem" }}>
                <HistoryTable />
            </Box>
        </>
    );
}
