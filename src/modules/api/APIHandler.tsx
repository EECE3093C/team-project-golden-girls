import { GameInfo } from "./GameInfo";
import { League } from "./League";

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
                homeTeam: {
                    name: game.homeTeam.name,
                    logo: game.homeTeam.logo,
                    color: game.homeTeam.teamColor,
                },
                awayTeam: {
                    name: game.awayTeam.name,
                    logo: game.awayTeam.logo,
                    color: game.awayTeam.teamColor,
                },
                date: game.date,
                time: game.time,
                location: game.homeTeam.city,
            });
        }

        return Promise.resolve(games);
    }
}

export default APIHandler;
