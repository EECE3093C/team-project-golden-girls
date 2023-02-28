import React from "react";
import GameCard from "../general/GameCard/GameCard";
import { TeamInfo } from "../api/TeamInfo";
import DenverMavericksLogo from "../../assets/test/DenverMavericksLogo.png";
import MiamiHeatLogo from "../../assets/test/MiamiHeatLogo.png";
import { GameInfo } from "../api/GameInfo";

import "./NBAPage.css";

class NBAPage extends React.Component {
    render() {
        // Create Example Game
        let homeTeam: TeamInfo = {
            logo: DenverMavericksLogo,
            color: "rgb(0,0,255)",
            name: "Denver Mavericks",
        };

        let awayTeam: TeamInfo = {
            logo: MiamiHeatLogo,
            color: "rgb(255,0,0)",
            name: "Miami Heat",
        };

        let game: GameInfo = {
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            date: "02/23/23",
            time: "7 PM EST",
            location: "Miami",
        };

        return (
            <div>
                <br />
                <GameCard game={game} />
            </div>
        );
    }
}

export default NBAPage;
