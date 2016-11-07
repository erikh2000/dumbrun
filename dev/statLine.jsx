import React from "react";
import ReactDOM from "react-dom";

class StatLine extends React.Component {
    render() {
        return (
            <div className="statLine">
                <label className="statLabel">{this.props.name}</label>
                <span className="stat">{this.props.value}</span>
            </div>
        );
    }
}

export default StatLine;
