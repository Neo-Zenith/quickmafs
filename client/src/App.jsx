import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QueryPage from "./pages/QueryPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/query" element={<QueryPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
