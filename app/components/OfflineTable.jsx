import React from 'react';
import {Panel, Table, Button} from 'react-bootstrap';

export default class Legs extends React.Component {
  constructor() {
    super();
  }

  render() {

    if (!_.get(this.props, 'failed', []).length) {
      return (<div></div>);
    }
    else {
      return (
        <Panel bsStyle="danger" header="Offline Data To Sync" className="offline-table">

          <Table fill>
            <thead>
              <tr>
                <th>ObjectId</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
            {this.props.failed.map(function(fail, index) {
              console.log(fail);
              return (
                <tr key={"failure_" + index}>
                  <td>{fail.objectId}</td>
                  <td>{fail.className}</td>
                </tr>
              );
            })}
            </tbody>
          </Table>
          <Button block bsStyle='success' className='text-uppercase clear-button' onClick={this.props.reconcile}>Reconcile When Online</Button>
        </Panel>
      );
    }

  }

}
