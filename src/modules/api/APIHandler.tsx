import { GameInfo } from "./GameInfo";
import { League } from "./League";
import { TeamInfo } from "./TeamInfo";

const BASE_API_URL = "http://localhost:9000/api/v1/";

class APIHandler {
    static async getGames(startDate: Date, endDate: Date, sport: League): Promise<GameInfo[]> {
        const response = await fetch(
            BASE_API_URL +
                "games?" +
                new URLSearchParams({
                    start_date: startDate.toUTCString(),
                    end_date: endDate.toUTCString(),
                    sport: sport,
                })
        );
        const data = await response.json();
        const games: GameInfo[] = [];
        for (const game of data.games) {
            games.push({
                id: game.id,
                homeTeam: APIHandler.convertAPITeam(game.homeTeam),
                awayTeam: APIHandler.convertAPITeam(game.awayTeam),
                date: new Date(game.date),
                location: game.homeTeam.city,
                status: {
                    status: game.statusShort,
                    quarter: 0,
                    clock: null,
                    halftime: false,
                },
            });
        }

        return Promise.resolve(games);
    }

    static async getLiveScores(sport: League): Promise<GameInfo[]> {
        const response = await fetch(
            BASE_API_URL +
                "live?" +
                new URLSearchParams({
                    sport: sport,
                })
        );
        const data = await response.json();
        const scores: GameInfo[] = [];
        for (const game of data.games) {
            scores.push({
                id: game.id,
                homeTeam: APIHandler.convertAPITeam(game.homeTeam),
                awayTeam: APIHandler.convertAPITeam(game.awayTeam),
                date: new Date(game.date),
                location: game.homeTeam.city,
                status: {
                    status: game.gameStatus.statusShort,
                    quarter: game.gameStatus.gameQuarter,
                    clock: game.gameStatus.clock,
                    halftime: game.gameStatus.halftime,
                },
            });
        }

        return Promise.resolve(scores);
    }

    static convertAPITeam(team: any): TeamInfo {
        return {
            name: team.name,
            logo: team.logo,
            city: team.city,
            totalScore: team.totalScore,
            quarterScores: team.quarterScores,
            record: {
                wins: team.record.wins,
                losses: team.record.losses,
            },
            code: team.code,
            color: team.teamColor,
        };
    }
}

export default APIHandler;
