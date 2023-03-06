import React from "react";
import { GameInfo } from "../../api/GameInfo";

import "./LiveScoreCard.css";

type Props = {
    /**This contains the live game info for each game */
    game: GameInfo;
};

/*
 * A Widget for display live game score
 */
class LiveScoreCard extends React.Component<Props> {
    render() {
        return (
            <div className="liveScoreCard">
                <div className="scoreDateRow liveScoreText">
                    <div className="gameDate">{this.props.game.date}</div>
                    <div className="gameTime">{this.props.game.time}</div>
                </div>
                <div className="teamInfo liveScoreText">
                    <img src={this.props.game.homeTeam.logo} className="logo" alt="" />

                    <div className="teamName">{this.props.game.homeTeam.name}</div>
                    <div className="teamScore">{this.props.game.homeTeam.totalScore}</div>
                </div>
                <div className="teamInfo liveScoreText">
                    <img src={this.props.game.awayTeam.logo} className="logo" alt="" />

                    <div className="teamName">{this.props.game.awayTeam.name}</div>
                    <div className="teamScore">{this.props.game.awayTeam.totalScore}</div>
                </div>
            </div>
        );
    }
}
export default LiveScoreCard;
