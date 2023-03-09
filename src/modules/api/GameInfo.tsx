import { GameStatus } from "./GameStatus";
import { TeamInfo } from "./TeamInfo";

export type GameInfo = {
    id: number;
    homeTeam: TeamInfo;
    awayTeam: TeamInfo;
    date: Date;
    location: string;
    status: GameStatus;
};
