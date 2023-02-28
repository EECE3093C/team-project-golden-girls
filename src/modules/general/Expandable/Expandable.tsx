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

type State = {
    containerHeight: Height;
};

/*
 * A reusable component that collapses or expands its children.
 *
 * Toggling the expanded property will cause the content to animate to an expanded
 * position or an unexpanded position depending on the value of the expanded property.
 */
class Expandable extends React.Component<Props, State> {
    contentRef: React.RefObject<HTMLDivElement>;
    containerRef: React.RefObject<HTMLDivElement>;

    state: State = {
        containerHeight: 0,
    };

    constructor(props: Props) {
        super(props);

        this.onResize = this.onResize.bind(this);

        this.contentRef = React.createRef();
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
        this.checkHeight();
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (this.props.expandedHeight !== prevProps.expandedHeight || this.props.expanded !== prevProps.expanded) {
            this.checkHeight();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    render(): React.ReactNode {
        return (
            <div
                className="expandableContainer"
                style={{ height: this.state.containerHeight }}
                onTransitionEnd={this.onTransitionEnd.bind(this)}
            >
                <div className="expandableContent" ref={this.contentRef}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    onResize() {
        if (this.props.expanded && this.props.expandedHeight === "auto" && this.contentRef.current) {
            this.setState({ containerHeight: this.contentRef.current.offsetHeight });
        }
    }

    checkHeight() {
        let height = 0;

        if (this.props.expanded) {
            if (this.props.expandedHeight === "auto") {
                if (this.contentRef.current) {
                    height = this.contentRef.current.offsetHeight;
                }
            } else {
                height = this.props.expandedHeight;
            }
        }

        if (height !== this.state.containerHeight) {
            if (this.state.containerHeight === "auto" && this.contentRef.current !== null) {
                this.setState({ containerHeight: this.contentRef.current.offsetHeight });
                console.log(this.contentRef.current.offsetHeight);
            }

            this.setState({ containerHeight: height });
        }
    }

    /*
     * On transition end, if the height is set to auto, set the container's height to auto,
     * so it can still resize with its children.
     */
    onTransitionEnd() {
        if (this.props.expanded) {
            this.setState({ containerHeight: "auto" });
        }
    }
}

export default Expandable;
