import React from "react";
import Expandable from "../Expandable/Expandable";
import "./ExpandButton.css";

type Props = {
    /** The text displayed in the button */
    text: string;
    /** Additional classes that should be appended onto the button */
    className?: string;
    /** The child nodes that will be revealed on click */
    children?: React.ReactNode;
};

type State = {
    expanded: boolean;
};

/*
 * A button that reveals or hides its children when clicked.
 */
class ExpandButton extends React.Component<Props, State> {
    state = {
        expanded: false,
    };

    render() {
        return (
            <div
                className={
                    "expandButton noSelect " + (this.state.expanded ? "expanded" : "unexpanded") + " " + this.props.className
                }
            >
                <div className="expandButtonText" onClick={() => this.toggleExpand()}>
                    {this.props.text}
                </div>

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
