import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QueryPage from "./pages/QueryPage";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/query" element={<QueryPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
