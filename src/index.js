import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import queryAPI from './query-api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: false,
      delay: true
    };
  }

  fetchData() {
    let delay = this.state.delay ? this.props.apiQueryDelay : 0;

    queryAPI(delay).then((response) => {
      this.setState({ data: response.data, error: false });
    })
    .catch((error) => {
      console.error(error);
      this.setState({ data: null, error: true });
    })
  }

  toggleAPI() {
    this.setState({ delay: !this.state.delay });
  }

  render() {
    return (
      <div>
        <h1>React Training</h1>
        <hr/>
        <p>Delay is <span className="label label-default">{this.state.delay ? 'active' : 'disabled'}</span></p>
        {(this.state.error) ? (
          <p>Sorry - there was an error with your request.</p>
        ) : (
          <p>{this.state.data}</p>
        )}
        <ul className="list-inline">
          <li className="list-inline-item">
            <button className="btn btn-outline-success" 
                    onClick={() => this.fetchData()}>Get data</button>
          </li>
          <li className="list-inline-item">
            <button className="btn btn-outline-primary" 
                    onClick={() => this.toggleAPI()}>Toggle API</button>
          </li>
        </ul>
      </div>
    );
  }
}

App.displayName = { name: "App" };
App.defaultProps = { apiQueryDelay: 0 };
App.propTypes = { apiQueryDelay: PropTypes.number };

ReactDOM.render(<App apiQueryDelay={2000}/>, document.getElementById("root"));
