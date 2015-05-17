/**
 * @jsx React.DOM
 */

'use strict';


class Leg extends React.Component {
  render() {
    return (
      <div className="leg">
        <div className="leg-num">{this.props.index}</div>
        <div className="leg-racer-name">{this.props.data.legRacerName}</div>
      </div>
    )
  }
}

class LegsContainer extends React.Component {
  render() {
    return (
      <div className="RELAYbloomApp">
        <div className="Controls">
          <button className="Button"  type="button">Handoff</button>
          <button className="Button--secondary" type="button">Button</button>
          <button className="Button--secondary" type="button">Button</button>
        </div>
        <div className="Results">
          {legs.map(function(leg, index) {
            return <Leg key={leg.key} index={index+1} data={leg}/>
          })}
        </div>
      </div>
    );
  }
}
const legs = [
  {legRacerName: "Racer 1"},
  {legRacerName: "Racer 2"},
  {legRacerName: "Racer 3"},
  {legRacerName: "Racer 4"}
];
React.render(<LegsContainer legs={legs}/>, document.getElementById('relayBloom'));

const initialState = {
  start: 0,
  lap: 0,
  mSecondsElapsedTotal: 0,
  mSecondsElapsedLap: 0,
  isRunning: false,
  results: []
};
function secondsToString(ms) {
  return moment().hour(0).minute(0).second(0).millisecond(ms).format('HH:mm:ss.SSS');
}
function formatDiff(ms) {
  if ( ms == 0 ) { return '-'; }
  if ( ms < 0 ) {
    return moment.duration(ms).asSeconds();
  }
  else {
    return "+" + moment.duration(ms).asSeconds();
  }
}

class StopWatchList extends React.Component {
  constructor() {}
  render() {
    var cx = React.addons.classSet,
      type = cx({
        'is-positive': this.props.data.diff > 0 ? true : false,
        'is-negative': this.props.data.diff < 0 ? true : false
      }),
      diff = formatDiff(this.props.data.diff),
      lap = secondsToString( this.props.data.lap ),
      total = secondsToString( this.props.data.total );
    return  (
      <tr>
        <td>{this.props.index}</td>
        <td className={type}>{diff}</td>
        <td>{lap}</td>
        <td>{total}</td>
      </tr>
    );
  }
}
class StopWatchApp extends React.Component {
  constructor() {
    this.state = initialState;
    // Bind all methods
    this.tick = this.tick.bind(this);
    this.handleStartAndStop = this.handleStartAndStop.bind(this);
    this.handleLap = this.handleLap.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  tick() {
    var mSecondsElapsedTotal = new Date().getTime() - this.state.start,
      mSecondsElapsedLap = new Date().getTime() - this.state.lap;

    this.setState({ mSecondsElapsedTotal: mSecondsElapsedTotal, mSecondsElapsedLap: mSecondsElapsedLap })
  }
  handleStartAndStop() {
    if ( this.state.isRunning ) {
      this.handleStop();
      return;
    }
    var startValue = this.state.start;
    if ( this.state.start === 0 ) {
      startValue = new Date().getTime();
    }
    this.setState({
      start: startValue,
      isRunning: true,
      lap: new Date().getTime()
    });
    this.interval = setInterval(this.tick.bind(this), 10);
  }
  handleLap() {
    if ( !this.state.isRunning ) { return; }
    var oldResults = this.state.results,
      newLap = {
        key: new Date().getTime(),
        lap : this.state.mSecondsElapsedLap,
        total : this.state.mSecondsElapsedTotal,
        diff: 0
      };
    // Diff
    if ( this.state.results.length >= 1 ) {
      newLap.diff = newLap.lap - this.state.results[this.state.results.length-1].lap;
    }
    // Adding the new lap to the results
    var newResults = oldResults.concat([newLap]);
    console.log(newResults);
    // New lap
    this.setState({
      lap: new Date().getTime(),
      results: newResults
    });
  }
  handleStop() {
    this.handleLap();
    this.setState({ isRunning : false });
    clearInterval( this.interval );
  }
  handleReset() {
    this.setState( initialState );
  }
  render() {
    var cx = React.addons.classSet,
      appClassState = cx({
        'StopWatchApp': true,
        'is-running': this.state.isRunning,
      }),
      ms = secondsToString( this.state.mSecondsElapsedTotal ),
      msLap = secondsToString( this.state.mSecondsElapsedLap ),
      labelStart = this.state.isRunning ? 'Stop' : 'Start',
      results = this.state.results;
    return (
      <div className={appClassState}>
      <div className="Time">
      <h2 className="Time-label">Total</h2>
      <span className="Time-value">{ms}</span>
      </div>
      <div className="Time">
      <h2 className="Time-label">Lap</h2>
      <span className="Time-value">{msLap}</span>
      </div>
      <div className="Controls">
      <button className="Button"  type="button" onClick={this.handleStartAndStop}>{labelStart}</button>
<button className="Button--secondary" type="button" onClick={this.handleLap} disabled={this.state.isRunning ? '' : 'disabled'}>Lap</button>
<button className="Button--secondary" type="button" onClick={this.handleReset} disabled={this.state.isRunning ? 'disabled' : ''}>Reset</button>
</div>
<table className="Results">
  <thead>
  <tr>
  <th>#</th>
<th>Diff</th>
<th>Lap</th>
<th>Total</th>
</tr>
</thead>
<tbody>
{results.map(function(result, index) {
  return <StopWatchList key={result.key} index={index+1} data={result}/>
})}
</tbody>
</table>
<footer className="Footer">
  <a href="https://twitter.com/wakooka" className="Footer-link">@wakooka</a>
  </footer>
  </div>
);
}
}
var results = [];
React.render(<StopWatchApp results={results}/>, document.getElementById('container'));
