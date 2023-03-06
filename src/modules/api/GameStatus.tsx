export enum GameStatusState {
    NOT_STARTED = 1,
    LIVE = 2,
    FINISHED = 3,
}

export type GameStatus = {
    status: GameStatusState;
    quarter: number;
    clock: string | null;
    halftime: boolean;
};
