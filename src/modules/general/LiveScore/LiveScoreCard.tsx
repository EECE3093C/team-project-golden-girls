import React from "react";

import { GameScore } from "../../api/GameScore";

import "./LiveScoreCard.css";

type Props = {
    /**This contains the live game info for each game */
    game: GameScore;
};

/*
 * A Widget for display live game score
 */
class LiveScoreCard extends React.Component<Props> {
    render() {
        return (
            <div className="liveScoreCard">
                <div className="scoreDateRow liveScoreText">
                    <div className="gameDate">{this.props.game.gameDate}</div>
                    <div className="gameTime">{this.props.game.gameTime}</div>
                </div>
                <div className="teamInfo liveScoreText">
                    <img src={this.props.game.team1Logo} className="logo" alt="" />

                    <div className="teamName">{this.props.game.team1Name}</div>
                    <div className="teamScore">{this.props.game.team1Score}</div>
                </div>
                <div className="teamInfo liveScoreText">
                    <img src={this.props.game.team2Logo} className="logo" alt="" />

                    <div className="teamName">{this.props.game.team2Name}</div>
                    <div className="teamScore">{this.props.game.team2Score}</div>
                </div>
            </div>
        );
    }
}
export default LiveScoreCard;
