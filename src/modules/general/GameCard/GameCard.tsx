import React from "react";

import { ReactComponent as VSSymbol } from "./vsSymbol.svg";
import { ReactComponent as RightEdge } from "./RightEdge.svg";
import { ReactComponent as LeftEdge } from "./LeftEdge.svg";
import Expandable from "../Expandable/Expandable";
import ExpandButton from "../ExpandButton/ExpandButton";
import { GameInfo } from "../../api/GameInfo";

import "./GameCard.css";

type Props = {
    /** The game that the card is displaying */
    game: GameInfo;
};

type State = {
    expanded: boolean; 
};

/*
 * A widget for displaying basic info about a game and navigating to the bet menus.
 */
class GameCard extends React.Component<Props, State> {
    state = {
        expanded: false,
    };

    render() {
        return (
            <div className="gameCard">
                <div
                    className="gameTitleBar"
                    style={{ background: this.getGradient() }}
                    onClick={() => this.setState({ expanded: !this.state.expanded })}
                >
                    <LeftEdge className="edge left" />
                    <img src={this.props.game.homeTeam.logo} className="logo left" alt="" />

                    <div className="teamName left">{this.props.game.homeTeam.name}</div>
                    <VSSymbol />
                    <div className="teamName right">{this.props.game.awayTeam.name}</div>

                    <RightEdge className="edge right" />
                    <img src={this.props.game.awayTeam.logo} className="logo right" alt="" />
                </div>

                <Expandable expandedHeight={"auto"} expanded={this.state.expanded}>
                    <div className="gameCardInfoContainer">
                        <div className="gameInfoText">Date: {this.props.game.date}</div>
                        <div className="gameInfoText">Start Time: {this.props.game.time}</div>
                        <div className="gameInfoText">Location: {this.props.game.location}</div>
                    </div>

                    <div className="gameCardButtonContainer">
                        <ExpandButton text="Game Bets" className="gameCardButton">
                            <div className="betButtonContainer">
                                <div className="betButton">TO WIN</div>
                                <div className="betButton">TOTAL POINTS</div>
                                <div className="betButton">SPREAD</div>
                            </div>
                        </ExpandButton>
                        <ExpandButton text="Player Bets" className="gameCardButton">
                            <div className="betButtonContainer">
                                <div className="betButton">TO WIN</div>
                                <div className="betButton">TOTAL POINTS</div>
                                <div className="betButton">SPREAD</div>
                            </div>
                        </ExpandButton>
                        <ExpandButton text="Other Bets" className="gameCardButton">
                            <div className="betButtonContainer">
                                <div className="betButton">TO WIN</div>
                                <div className="betButton">TOTAL POINTS</div>
                                <div className="betButton">SPREAD</div>
                            </div>
                        </ExpandButton>
                    </div>
                </Expandable>
            </div>
        );
    }

    getGradient() {
        return `
        linear-gradient(
            90deg,
            ${this.props.game.homeTeam.color} 0%,
            ${this.props.game.homeTeam.color} 30%,
            rgba(0, 0, 0, 1) 50%,
            ${this.props.game.awayTeam.color} 70%,
            ${this.props.game.awayTeam.color} 100%
        )`;
    }
}

export default GameCard;
