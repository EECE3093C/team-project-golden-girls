import React from "react";
import { TeamInfo } from "../api/TeamInfo";
import { GameInfo } from "../api/GameInfo";
import GameCardList from "../general/GameCard/GameCardList";
import APIHandler from "../api/APIHandler";
import { League } from "../api/League";
import { GameScore } from "../api/GameScore";

import "./NBAPage.css";
import LiveScoreList from "../general/LiveScore/LiveScoreList";
import LeagueDisplay from "../general/LeagueDisplay/LeagueDisplay";

const USE_TEST_DATA = true;

type Props = {};

type State = {
    games: GameInfo[] | null;
    scores: GameScore[] | null;
    startDate: Date;
    endDate: Date;
};

class NBAPage extends React.Component<Props, State> {
    state = {
        games: null,
        scores: null,
        startDate: new Date(),
        endDate: (() => {
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 7);
            return endDate;
        })(),
    };

    componentDidMount(): void {
        if (USE_TEST_DATA) {
            this.setExampleData();
        } else {
            this.requestGameList();
        }
    }

    render() {
        return (
            <div className="nba page">
                <div className="scoreSidebar">
                    {this.state.scores !== null ? <LiveScoreList gameScores={this.state.scores} /> : <div> Loading </div>}
                </div>

                <div className="content">
                    <div className="leagueTitleBlock">
                        <LeagueDisplay league={League.NBA} usePrimaryColors={false} />
                        <h1 className="leagueGameListTitle">UPCOMING GAMES</h1>
                        <h4 className="leagueGameListDates">
                            {NBAPage.getDateDayDisplay(this.state.startDate)} - {NBAPage.getDateDayDisplay(this.state.endDate)}
                        </h4>
                    </div>
                    <br />
                    {this.state.games !== null ? <GameCardList games={this.state.games} /> : <div> Loading </div>}
                </div>
            </div>
        );
    }

    static getDateDayDisplay(date: Date): string {
        return date.toLocaleString("default", {
            month: "short",
            day: "numeric",
        });
    }

    requestGameList(): void {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        APIHandler.getGames(today, tomorrow, League.NBA).then((games) => {
            this.setState({
                games: games,
            });
        });
    }

    setExampleData(): void {
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

        let score1: GameScore = {
            gameId: 1,
            gameDate: game1.date,
            gameTime: game1.time,
            team1Name: game1.homeTeam.name,
            team2Name: game1.awayTeam.name,
            team1Logo: game1.homeTeam.logo,
            team2Logo: game1.awayTeam.logo,
            team1Score: 34,
            team2Score: 7,
        };

        let score2: GameScore = {
            gameId: 2,
            gameDate: game2.date,
            gameTime: game2.time,
            team1Name: game2.homeTeam.name,
            team2Name: game2.awayTeam.name,
            team1Logo: game2.homeTeam.logo,
            team2Logo: game2.awayTeam.logo,
            team1Score: 13,
            team2Score: 62,
        };

        let scores = [score1, score2];

        this.setState({
            games: games,
            scores: scores,
        });
    }
}

export default NBAPage;
