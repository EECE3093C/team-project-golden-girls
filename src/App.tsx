import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NBAPage from "./modules/nba/NBAPage";
import LandingPage from "./modules/landing/LandingPage";
import Header from "./modules/header/Header";

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path={"/"} element={<LandingPage />} />
                    <Route path={"/nba"} element={<NBAPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
