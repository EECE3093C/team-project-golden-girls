import React from "react";
import { League } from "../../api/League";
import "./LeagueDisplay.css";

type Props = {
    /** The league that should be displayed */
    league: League;
    /** Whether to use prmary or secondary colors */
    usePrimaryColors: boolean;
};

/*
 * A button that reveals or hides its children when clicked.
 */
class LeagueDisplay extends React.Component<Props> {
    static defaultProps = {
        usePrimaryColors: true,
    };

    state = {
        expanded: false,
    };

    render() {
        return (
            <div className={"leagueDisplay " + (this.props.usePrimaryColors ? "primary" : "secondary")}>
                {this.props.league.toUpperCase()}
            </div>
        );
    }
}

export default LeagueDisplay;
