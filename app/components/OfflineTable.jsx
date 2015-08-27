import React from 'react';
import {Panel,Table} from 'react-bootstrap';

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
        <Panel bsStyle="danger" header="Offline Data To Sync">

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
                <tr key={index}>
                  <td>{fail.objectId}</td>
                </tr>
              );
            })}
            </tbody>
          </Table>

        </Panel>
      );
    }

  }

}
