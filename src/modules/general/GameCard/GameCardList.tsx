import React, { ReactNode } from "react";

import { GameInfo } from "../../api/GameInfo";
import GameCard from "./GameCard";

import "./GameCardList.css";

type Props = {
    /** The games that should be displayed in this list */
    games: GameInfo[];
};

/*
 * A component that creates a list of GameCards.
 */
class GameCardList extends React.Component<Props> {
    render() {
        const gameComponents: ReactNode[] = [];

        for (const game of this.props.games) {
            gameComponents.push(<GameCard key={game.id} game={game} />);
        }

        return <div className="gameCardList">{gameComponents}</div>;
    }
}

export default GameCardList;
