import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="titleBar">
                    <Link to="/" className="noSelect  noDecoration headerTitle">
                        OBSCENE ODDS
                    </Link>
                </div>
                <div className="linkBar">
                    <Link to="/NBA" className="headerLink noSelect noDecoration">
                        NBA
                    </Link>
                    <Link to="/NFL" className="headerLink noSelect noDecoration">
                        NFL
                    </Link>
                    <Link to="/MLB" className="headerLink noSelect noDecoration">
                        MLB
                    </Link>
                    <Link to="/NHL" className="headerLink noSelect noDecoration">
                        NHL
                    </Link>
                    <Link to="/NCAAM" className="headerLink noSelect noDecoration">
                        NCAAM
                    </Link>
                    <Link to="/SOCCER" className="headerLink noSelect noDecoration">
                        SOCCER
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;
