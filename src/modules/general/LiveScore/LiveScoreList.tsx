import React, { ReactNode } from "react";

import { GameScore } from "../../api/GameScore";

import "./LiveScoreList.css";
import LiveScoreCard from "./LiveScoreCard";

type Props = {
    /** The game scores that should be displayed in this list */
    gameScores: GameScore[];
};

/*
 * A component that creates a list of Live Scores.
 */
class LiveScoreList extends React.Component<Props> {
    render() {
        const gameComponents: ReactNode[] = [];

        for (const game of this.props.gameScores) {
            gameComponents.push(<LiveScoreCard key={game.gameId} game={game} />);
        }

        return <div className="liveScoreList">{gameComponents}</div>;
    }
}

export default LiveScoreList;
