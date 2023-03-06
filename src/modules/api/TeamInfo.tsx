export type TeamInfo = {
    name: string;
    logo: string;
    city: string;
    totalScore: number;
    quarterScores: number[];
    record: {
        wins: number;
        losses: number;
    };
    code: string;
    color: string | undefined;
};
