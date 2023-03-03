import React from "react";
import GameCard from "../general/GameCard/GameCard";
import { TeamInfo } from "../api/TeamInfo";
import { GameInfo } from "../api/GameInfo";
import { GameScore } from "../api/GameScore"
import GameScoreWindow from "../general/GameScoreWindow/GameScoreWindow";

import "./NBAPage.css";


class NBAPage extends React.Component {
    render() {
        // Create Example Game
        let homeTeam: TeamInfo = {
            logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b8/Mavericks_de_Dallas_logo.svg/150px-Mavericks_de_Dallas_logo.svg.png",
            color: "rgb(0,0,255)",
            name: "Dallas Mavericks",
        };

        let awayTeam: TeamInfo = {
            logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/1/1c/Miami_Heat_-_Logo.svg/1200px-Miami_Heat_-_Logo.svg.png",
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
        let score: GameScore = {
            GameDate :   "02-23-23",
            GameTime :   "7:00 PM EST",
            Team1Logo :  homeTeam.logo,
            Team1Name :  homeTeam.name,
            Team2Logo :  awayTeam.logo,
            Team2Name :  awayTeam.name,
            Team1Score : "00",
            Team2Score : "00",
        };
        return (
            <div>
                <br />
                <GameCard game={game} />
                <GameScoreWindow game={score}/>
            </div>
        );
    }
}

export default NBAPage;
