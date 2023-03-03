import React from "react";
import { TeamInfo } from "../api/TeamInfo";
import { GameInfo } from "../api/GameInfo";

import "./NBAPage.css";
import GameCardList from "../general/GameCard/GameCardList";
import APIHandler from "../api/APIHandler";
import { Sport } from "../api/Sport";

const USE_TEST_DATA = false;

type Props = {};

type State = {
    games: GameInfo[] | null;
};

class NBAPage extends React.Component<Props, State> {
    state = {
        games: null,
    };

    componentDidMount(): void {
        if (USE_TEST_DATA) {
            this.setExampleGameList();
        } else {
            this.requestGameList();
        }
    }

    render() {
        return (
            <div>
                <br />
                {this.state.games !== null ? <GameCardList games={this.state.games} /> : <div> Loading </div>}
            </div>
        );
    }

    requestGameList(): void {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        APIHandler.getGames(today, tomorrow, Sport.NBA).then((games) => {
            this.setState({
                games: games,
            });
        });
    }

    setExampleGameList(): void {
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

        let game1: GameInfo = {
            id: 1,
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            date: "02/23/23",
            time: "7 PM EST",
            location: "Miami",
        };

        let game2: GameInfo = {
            id: 2,
            homeTeam: awayTeam,
            awayTeam: homeTeam,
            date: "02/25/23",
            time: "1 PM EST",
            location: "Dallas",
        };

        let games = [game1, game2];

        this.setState({
            games: games,
        });
    }
}

export default NBAPage;
