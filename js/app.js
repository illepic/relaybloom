/**
 * @jsx React.DOM
 */

'use strict';

const  race = {
  name: "Hood to Coast 2015",
  details: "Details here",
  legs: [
    {},
    {},
    {}
  ],
  plan: {
    expectedDuration: 174737000,
    legs: [
      {
        name: "Leg 1",
        abbreviation: "L1",
        timeExpected: 9857987597,
        timeStarted: 123123123123,
        timeCompleted: 0,
        racer: {
          id: 1,
          name: "Chris"
        }
      },
      {
        name: "Leg 2",
        abbreviation: "L2",
        timeExpected: 9857987597,
        timeStarted: 0,
        timeCompleted: 0,
        racer: {
          id: 2,
          name: "Dalene"
        }
      },
      {
        name: "Leg 3",
        abbreviation: "L3",
        timeExpected: 9857987597,
        timeStarted: 0,
        timeCompleted: 0,
        racer: {
          id: 3,
          name: "Tyler"
        }
      }
    ]
  }
};

const racers = [
  {
    id: 1,
    name: "Chris",
    group: "Van 1",
    team: "The Cron Runs"
  }
];

class Leg extends React.Component {
  render() {
    return (
      <li className="list-group-item">
        <span className="label label-default">{this.props.data.abbreviation}</span> <span>{this.props.data.racer.name}</span> <span className="badge">00:35:32 / {this.props.data.timeExpected}</span>
      </li>
    );
  }
}

class Timer extends React.Component {
  render() {
    console.log(this.props.ms);
    var formattedDuration = moment.utc(this.props.ms).format("hh:mm:ss");
    return (
      <span>{formattedDuration}</span>
    );
  }
}
Timer.defaultProps = {ms: 0};


class RelayBloomNav extends React.Component {
  render() {
    return (
      <Navbar brand={<a href="#">React-Bootstrap</a>}>
        <Nav>
          <NavItem eventKey={1} href='#'>Link</NavItem>
          <NavItem eventKey={2} href='#'>Link</NavItem>
          <DropdownButton eventKey={3} title='Dropdown'>
            <MenuItem eventKey='1'>Action</MenuItem>
            <MenuItem eventKey='2'>Another action</MenuItem>
            <MenuItem eventKey='3'>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey='4'>Separated link</MenuItem>
          </DropdownButton>
        </Nav>
      </Navbar>
    );
  }
}

class RelayBloomApp extends React.Component {
  constructor() {
    // Bind events
    this.handoff = this.handoff.bind(this);
    this.tick = this.tick.bind(this);
    // Set state
    this.state = {
      raceStart : 0,
      elapsed: 0,
      isRunning: false,
      currentLeg: 0
    };
  }
  render() {
    return (
      <div className="RELAYbloomApp">
        <RelayBloomNav/>
        <h1 className="text-center"><small><i className="fa fa-clock-o  "></i> <strong><Timer ms={this.state.elapsed}/></strong> / <Timer ms={this.props.appdata.plan.expectedDuration}/></small></h1>
        <button type="button" onClick={this.handoff} className="btn btn-block btn-warning text-uppercase handoff-button">Handoff</button>

        <div className="panel panel-primary">
          <div className="panel-heading"><span className="label label-info">L1-L6</span> <span>Van 1</span></div>
          <div className="panel-body">
            <h1>Jen <small>00:35:32</small></h1>
            <p>Total time: 343:343</p>
            <p><span>More stats about legs goes here</span><span className="label label-default">L1</span></p>
          </div>

          <ul className="list-group">
            {this.props.appdata.plan.legs.map(function(leg, index) {
              return <Leg key={leg.key} index={index+1} data={leg}/>
            })}
          </ul>

        </div>
      </div>
    );
  }
  handoff() {
    console.log('handoff clicked');

    if (this.state.isRunning) {
      this.setState({isRunning: false});
      clearInterval( this.interval );
    }
    else {
      this.setState({
        raceStart: moment(),
        isRunning: true
      });
      this.interval = setInterval(this.tick.bind(this), 1000);
    }

  }
  tick() {
    this.setState({ elapsed: moment().diff(this.state.raceStart) });
  }
}



React.render(<RelayBloomApp appdata={race}/>, document.getElementById('relayBloom'));

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
