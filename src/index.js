import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import queryAPI from './query-api';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: false
    };
  }

  fetchData(delay) {
    queryAPI(delay).then((response) => {
      this.setState({ data: response.data, error: false });
    })
    .catch((error) => {
      this.setState({ data: null, error: true });
    })
  }

  render() {
    return (
      <div ref="container">
        <h1>React Training</h1>
        {(this.state.error) ? (
          <p>Sorry - there was an error with your request.</p>
        ) : (
          <p>{this.state.data}</p>
        )}
        <ul className="list-inline">
          <li className="list-inline-item">
            <button className="btn btn-outline-success" 
                    onClick={() => this.fetchData(0)}>Get data now</button>
          </li>
          <li className="list-inline-item">
            <button className="btn btn-outline-primary" 
                    onClick={() => this.fetchData(2000)}>Get data in 2 seconds</button>
          </li>
          <li className="list-inline-item">
            <button className="btn btn-outline-danger" 
                    onClick={() => this.fetchData()}>This will fail</button>
          </li>
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("index"));
