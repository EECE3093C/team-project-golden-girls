import React from "react";
import "./Expandable.css";

type Height = "auto" | number;

type Props = {
    /** The height that this box should expand to. Either a number or 'auto'. */
    expandedHeight: Height;
    /** Whether the content should be expanded */
    expanded: boolean;
    /** The child nodes that are collapsed and expanded */
    children?: React.ReactNode;
};

/*
 * The different states Expandable can be in.
 *
 * PREPARING_TO_CLOSE exists as a state so that we can change the height to fixed number before closing. This is
 * because css transitions do not work with the "auto" height.
 */
enum ExpandState {
    PREPARING_TO_CLOSE = 0,
    CLOSING = 1,
    CLOSED = 2,
    OPENING = 3,
    OPEN = 4,
}

type State = {
    expandState: ExpandState;
};

/*
 * A reusable component that collapses or expands its children using a smooth transition.
 *
 * Toggling the expanded property will cause the content to animate to an expanded
 * position or an unexpanded position depending on the value of the expanded property.
 */
class Expandable extends React.Component<Props, State> {
    contentRef: React.RefObject<HTMLDivElement>;
    containerRef: React.RefObject<HTMLDivElement>;

    state = {
        expandState: ExpandState.CLOSED,
    };

    constructor(props: Props) {
        super(props);

        this.onResize = this.onResize.bind(this);

        this.contentRef = React.createRef();
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
        if (this.props.expanded) {
            this.setState({ expandState: ExpandState.OPENING });
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (this.props.expanded !== prevProps.expanded) {
            if (this.props.expanded) {
                this.setState({ expandState: ExpandState.OPENING });
            } else {
                this.setState({ expandState: ExpandState.PREPARING_TO_CLOSE });
            }
        }

        if (this.state.expandState === ExpandState.PREPARING_TO_CLOSE) {
            setTimeout(() => this.setState({ expandState: ExpandState.CLOSING }));
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    render(): React.ReactNode {
        let height: Height = 0;

        // Get height from state
        switch (this.state.expandState) {
            case ExpandState.PREPARING_TO_CLOSE: {
                height = this.getFixedExpandedHeight();
                break;
            }
            case ExpandState.CLOSING: {
                height = 0;
                break;
            }
            case ExpandState.CLOSED: {
                height = 0;
                break;
            }
            case ExpandState.OPENING: {
                height = this.getFixedExpandedHeight();
                break;
            }
            case ExpandState.OPEN: {
                if (this.props.expandedHeight === "auto") {
                    height = "auto";
                } else {
                    height = this.props.expandedHeight;
                }
                break;
            }
        }

        return (
            <div className="expandableContainer" style={{ height: height }} onTransitionEnd={this.onTransitionEnd.bind(this)}>
                <div className="expandableContent" ref={this.contentRef}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    onResize() {
        if (this.state.expandState === ExpandState.OPEN || this.state.expandState === ExpandState.OPENING) {
            this.setState({ expandState: ExpandState.OPENING });
        }
    }

    getHeightFromState(state: ExpandState) {}

    /*
     * Returns how tall the expanded box is when expanded in pixels.
     */
    getFixedExpandedHeight(): number {
        if (this.props.expandedHeight === "auto") {
            if (this.contentRef.current) {
                return this.contentRef.current.offsetHeight;
            } else {
                return 1;
            }
        } else {
            return this.props.expandedHeight;
        }
    }

    /*
     * On transition end, change the expandable's state
     */
    onTransitionEnd() {
        if (this.state.expandState === ExpandState.OPEN || this.state.expandState === ExpandState.OPENING) {
            this.setState({ expandState: ExpandState.OPEN });
        } else {
            this.setState({ expandState: ExpandState.CLOSED });
        }
    }
}

export default Expandable;
