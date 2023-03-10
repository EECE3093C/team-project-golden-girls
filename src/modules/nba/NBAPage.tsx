import React from "react";
import { TeamInfo } from "../api/TeamInfo";
import { GameInfo } from "../api/GameInfo";
import GameCardList from "../general/GameCard/GameCardList";
import APIHandler from "../api/APIHandler";
import { League } from "../api/League";

import "./NBAPage.css";
import LiveScoreList from "../general/LiveScore/LiveScoreList";
import LeagueDisplay from "../general/LeagueDisplay/LeagueDisplay";
import { GameStatusState } from "../api/GameStatus";

const USE_TEST_DATA = false;
const REFRESH_SCORE_INTERVAL = 60 * 1000;

type Props = {};

type State = {
    games: GameInfo[] | null;
    scores: GameInfo[] | null;
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

    liveScoreHandle: NodeJS.Timer | null = null;

    componentDidMount(): void {
        if (USE_TEST_DATA) {
            this.setExampleData();
        } else {
            this.requestGameList();
            this.requestScoreList();

            this.liveScoreHandle = setInterval(() => {
                this.requestScoreList();
            }, REFRESH_SCORE_INTERVAL);
        }
    }

    componentWillUnmount(): void {
        if (this.liveScoreHandle !== null) {
            clearInterval(this.liveScoreHandle);
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

    requestScoreList(): void {
        APIHandler.getLiveScores(League.NBA).then((scores) => {
            this.setState({
                scores: scores,
            });
        });
    }

    setExampleData(): void {
        // Create Example Game
        let team1: TeamInfo = {
            logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b8/Mavericks_de_Dallas_logo.svg/150px-Mavericks_de_Dallas_logo.svg.png",
            color: "rgb(0,0,255)",
            name: "Dallas Mavericks",
            city: "",
            totalScore: 21,
            quarterScores: [],
            record: {
                wins: 0,
                losses: 0,
            },
            code: "",
        };

        let team2: TeamInfo = {
            logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/1/1c/Miami_Heat_-_Logo.svg/1200px-Miami_Heat_-_Logo.svg.png",
            color: "rgb(255,0,0)",
            name: "Miami Heat",
            city: "",
            totalScore: 14,
            quarterScores: [],
            record: {
                wins: 0,
                losses: 0,
            },
            code: "",
        };

        let team3: TeamInfo = {
            logo: "https://upload.wikimedia.org/wikipedia/fr/archive/d/d6/20161212034849%21Wizards2015.png",
            color: "rgb(0, 45, 98)",
            name: "Wizards",
            city: "Washington",
            totalScore: 93,
            quarterScores: [],
            record: {
                wins: 0,
                losses: 0,
            },
            code: "",
        };

        let game1: GameInfo = {
            id: 1,
            homeTeam: team1,
            awayTeam: team2,
            date: new Date(),
            location: "Miami",
            status: {
                status: GameStatusState.NOT_STARTED,
                quarter: 0,
                clock: null,
                halftime: false,
            },
        };

        let game2: GameInfo = {
            id: 2,
            homeTeam: team3,
            awayTeam: team2,
            date: new Date(),
            location: "Washington",
            status: {
                status: GameStatusState.LIVE,
                quarter: 3,
                clock: null,
                halftime: false,
            },
        };

        let game3: GameInfo = {
            id: 3,
            homeTeam: team2,
            awayTeam: team1,
            date: new Date(),
            location: "Dallas",
            status: {
                status: GameStatusState.FINISHED,
                quarter: 1,
                clock: "1:10",
                halftime: true,
            },
        };

        let games = [game1, game2, game3];

        this.setState({
            games: games,
            scores: games,
        });
    }
}

export default NBAPage;
