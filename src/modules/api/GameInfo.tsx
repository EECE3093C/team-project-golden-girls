import { TeamInfo } from "./TeamInfo";

export type GameInfo = {
    homeTeam: TeamInfo;
    awayTeam: TeamInfo;
    date: string;
    time: string;
    location: string;
};
