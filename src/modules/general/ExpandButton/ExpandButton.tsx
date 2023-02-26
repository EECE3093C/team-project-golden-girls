import React from "react";
import Expandable from "../Expandable/Expandable";
import "./ExpandButton.css";

type Props = {
    text: string;
    children?: React.ReactNode;
};

type State = {
    expanded: boolean;
};

class ExpandButton extends React.Component<Props, State> {
    state = {
        expanded: false,
    };

    render() {
        return (
            <div
                className={"expandButton noSelect " + (this.state.expanded ? "expanded" : "unexpanded")}
                onClick={() => this.toggleExpand()}
            >
                <div className="expandButtonText">{this.props.text}</div>

                <Expandable expandedHeight={"auto"} expanded={this.state.expanded}>
                    {this.props.children}
                </Expandable>
            </div>
        );
    }

    toggleExpand() {
        this.setState({ expanded: !this.state.expanded });
    }
}

export default ExpandButton;
