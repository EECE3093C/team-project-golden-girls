//<Start of History>
//Jimmy German Created GameScore File 03/01/2023

import { TeamInfo } from "./TeamInfo";

export type GameScore = {
    GameDate : string;
    GameTime : string;
    
    Team1Name : string;
    Team2Name : string;

    Team1Logo : string;
    Team2Logo : string;
    
    Team1Score : string;
    Team2Score : string;
}