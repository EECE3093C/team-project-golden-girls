import React from "react";
import "./Expandable.css";

type Height = "auto" | number;

type Props = {
    expandedHeight: Height;
    expanded: boolean;
    children?: React.ReactNode;
};

type State = {
    containerHeight: number;
};

class Expandable extends React.Component<Props, State> {
    contentRef: React.RefObject<HTMLDivElement>;

    state = {
        containerHeight: 0,
    };

    constructor(props: Props) {
        super(props);
        this.contentRef = React.createRef();
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
        window.addEventListener("resize", this.onResize);
    }

    render(): React.ReactNode {
        return (
            <div className="expandableContainer" style={{ height: this.state.containerHeight }}>
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
            this.setState({ containerHeight: height });
        }
    }
}

export default Expandable;
