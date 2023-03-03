import { TeamInfo } from "./TeamInfo";

export type GameInfo = {
    id: number;
    homeTeam: TeamInfo;
    awayTeam: TeamInfo;
    date: string;
    time: string;
    location: string;
};
