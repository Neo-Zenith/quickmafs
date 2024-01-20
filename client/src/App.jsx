import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QueryPage from "./pages/QueryPage";
import SignupPage from "./pages/SignupPage";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/query" element={<QueryPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
