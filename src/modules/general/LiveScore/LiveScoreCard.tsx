import React from "react";
import { GameInfo } from "../../api/GameInfo";
import { GameStatusState } from "../../api/GameStatus";

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
        const dateOptions = {
            month: "short",
            day: "numeric",
        } as const;

        const timeOptions = {
            hour: "numeric",
            minute: "numeric",
        } as const;

        let statusBar;
        switch (this.props.game.status.status) {
            case GameStatusState.NOT_STARTED: {
                statusBar = (
                    <div className="statusRow scheduled liveScoreText">
                        <div className="gameDate">{this.props.game.date.toLocaleString("en-US", dateOptions)}</div>
                        <div className="gameTime">{this.props.game.date.toLocaleString("en-US", timeOptions)}</div>
                    </div>
                );
                break;
            }
            case GameStatusState.LIVE: {
                let quarterDisplay;

                if (this.props.game.status.halftime) {
                    quarterDisplay = <div>Halftime</div>;
                } else if (this.props.game.status.clock == null) {
                    quarterDisplay = <div>End of Q{this.props.game.status.quarter}</div>;
                } else {
                    quarterDisplay = (
                        <div>
                            Q{this.props.game.status.quarter} - {this.props.game.status.clock}
                        </div>
                    );
                }

                statusBar = (
                    <div className="statusRow scheduled liveScoreText">
                        <div className="flexRow">
                            <div className="redDot"></div>
                            <div className="liveText">Live</div>
                        </div>
                        {quarterDisplay}
                    </div>
                );
                break;
            }
            case GameStatusState.FINISHED:
                statusBar = <div className="statusRow scheduled liveScoreText">Final</div>;
                break;
            default:
                break;
        }

        return (
            <div className="liveScoreCard">
                {statusBar}
                <div className="teamInfo">
                    <img src={this.props.game.homeTeam.logo} className="logo" alt="" />

                    <div className="teamName">{this.props.game.homeTeam.name}</div>
                    <div className="teamScore">{this.props.game.homeTeam.totalScore}</div>
                </div>
                <div className="teamInfo">
                    <img src={this.props.game.awayTeam.logo} className="logo" alt="" />

                    <div className="teamName">{this.props.game.awayTeam.name}</div>
                    <div className="teamScore">{this.props.game.awayTeam.totalScore}</div>
                </div>
            </div>
        );
    }
}
export default LiveScoreCard;
