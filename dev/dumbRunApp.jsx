import React from 'react';
import ReactDOM from 'react-dom';
import StatLine from './statLine.jsx';
import { formatTimeText, formatDistanceText, calcMilePace } from "./timeDistUtil";

class DumbRunApp extends React.Component {
	constructor(props) {
      super(props);
      this.state = {
          isStarted: false,
          startTime: 0,
          milePace: NaN, //Msecs to run one mile. NaN is "can't be calculated" value which is true when distance is 0.
          elapsed: 0,
          distance: 0,
      };
      this.timer = null;
      this._onGoButtonClick = this._onGoButtonClick.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  _startTimer() {
    var that = this;

    if (this.timer !== null) {
      clearInterval(this.timer);
    }

    function _onEachSecond() {
      var elapsed, distance, milePace;
      if (that.state.isStarted) {
        elapsed = Date.now() - that.state.startTime;
        distance = elapsed * .000003; //TODO--stub
        milePace = calcMilePace(distance, elapsed);
        that.setState({
          elapsed: elapsed,
          distance: distance,
          milePace: milePace
        });
      }
    }

    that.timer = setInterval(_onEachSecond, 1000);
  }

	_onRecognizerMatch(match) {
		this.setState({lastMatch: match});
	}

  _onGoButtonClick() {
    if (this.state.isStarted) {
      clearInterval(this.timer);
      this.timer = null;
      this.setState({
        isStarted: false,
      });
    } else {
      this._startTimer();
      this.setState({
        isStarted: true,
        startTime: Date.now(),
        milePace: NaN,
        elapsed: 0,
        distance: 0
      });
    }
  }

	render() {
    var goButtonText, timeText, distanceText, milePaceText;
    if (this.state.isStarted) {
      goButtonText = "Stop";
    } else {
      goButtonText = "Start";
    }
    timeText = formatTimeText(this.state.elapsed);
    distanceText = formatDistanceText(this.state.distance);
    milePaceText = formatTimeText(this.state.milePace);

		return (
      <div id="DumbRunApp">
  			<p className="appTitle">DumbRun</p>
        <div className="runStats">
          <StatLine name="Time" value={ timeText } />
          <StatLine name="Distance" value={ distanceText } />
          <StatLine name="Mile Pace" value={ milePaceText } />
        </div>
        <button className="goButton" onClick={ this._onGoButtonClick }>{ goButtonText }</button>
      </div>
		);
	}
}

export default DumbRunApp;
