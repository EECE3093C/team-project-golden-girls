import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NBAPage from "./modules/nba/NBAPage";
import LandingPage from "./modules/landing/LandingPage";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={"/"} element={<LandingPage />} />
                    <Route path={"/nba"} element={<NBAPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
