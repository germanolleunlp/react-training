This React class is intended to query an endpoint that will return an alphanumeric string, after clicking a button.
This component is passed a prop "apiQueryDelay", which delays the endpoint request by N milliseconds. There is a 
second button to disable this functionality and have the endpoint request run immediately after button click.
This data is then to be displayed inside a simple container.
The "queryAPI" XHR handler will return the endpoint response in the form of a Promise (such as axios, fetch).
The response object will look like the following: {data: "A0B3HCJ"}
The containing element ref isn't used, but should remain within the class.
Please identify, correct and comment on any errors or bad practices you see in the React component class below.
Additionally, please feel free to change the code style as you see fit.
Please note - React version for this exercise is 15.5.4

```js

// This import will fail, you need to add the {} between 'Component' 
// to specify the 'Component' module to import from 'react'
import React, Component from 'react';

// If we assume that 'queryAPI' is the same level as this file, you need to add './'
// to specify the relative path
import queryAPI from 'queryAPI';

// The idea to extends from 'Component' is to have a state
class ShowResultsFromAPI extends Component() {
  constructor() {
    super(props);

    // Never used
    this.container = null;
  }

  // BAD! Anti-pattern modify the props, they should be read only
  onDisableDelay() {
    this.props.apiQueryDelay = 0;
  }

  click() {
    if (this.props.apiQueryDelay) {
      setTimeout(function() {
        this.fetchData();
      }, this.props.apiQueryDelay);
    }
  }

  fetchData() {
    // Missing catch in the promise to handle API's errors
    queryAPI()
      .then(function(response) {
        if (response.data) {
          // state did not defined in the constructor
          this.setState({
            data: response.data,
            error: false
          });
        }
      });
  }

  render() {
    // 1. Missing () between return statement
    // 2. React component should return only ONE DOM's element, here you are returning
    // first a <div> and the two others components outside.
    // You need wrap all of this in one single element.
    // 3. Use className instead of class to defined CSS's class selectors
    // 4. The correct way to use 'ref' is to create one ref in the constructor 
    // with `this.container = React.createRef()` and the add the reference here
    // <div ... ref={this.container}>
    return <div class="content-container" ref="container">
            {
              // Incorrect if/else statement
              // 2. 'error' and 'data', should be used by 'this.state' or declared before the
              // return statement
              if (!!error) {
                <p>Sorry - there was an error with your request.</p>
              }
              else {
                <p>data</p>
              }
            }
          </div>

          // <Button> looks like a React's component, but is not declared, 
          // instead you can use the native <button>
          // Here you are using two different ways to bind a function to an event
          // Is better follow one approach an be consistent.
          // Also, to bind the 'onDisableDelay', you should:
          // 1. Bind it in the constructor, like this.onDisableDelay = this.onDisableDelay.bind(this)
          // 2. Depends of the babel preset that you are using you can handle this with a different
          // way to declare the functions.
          <Button onClick={this.onDisableDelay}>Disable request delay</Button>.
          // If you are using 'babel-preset-stage-0' you can avoid this defining your methods as 
          // arrow functions, for example:
          // click = () => { .. }
          // then just use the 'click' function like: 'onClick={this.click}', but be aware
          // than you will receive the 'event' as params, if you need to pass a param,
          // is better declare an arrow function inside of the 'onClick'
          <Button onClick={this.click.bind(this)}>Request data from endpoint</Button>
  }
}

// The for 'displayName' is to set a different name for debugging purposes.
// Also the 'name' be default is inferred from the name of the function, in this case
// the class component's name, 'ShowResultsFromAPI', and is the same as the given name,
// completely redundant here
ShowResultsFromAPI.displayName = {
  name: "ShowResultsFromAPI"
};
ShowResultsFromAPI.defaultProps = {
  apiQueryDelay: 0
};

// In this version of React and +, the propTypes was removed from React,
// you need to import them:
// import PropTypes from 'prop-types';
// and then define the propTypes like:
// ShowResultsFromAPI.propTypes = {
//   apiQueryDelay: PropTypes.number
// };
ShowResultsFromAPI.propTypes = {
  apiQueryDelay: React.propTypes.number
};

// ContentContainer is not defined, instead you need to export the ShowResultsFromAPI
export ContentContainer;

// If this component will be used as root, you need to add it to the DOM, like:
// ReactDOM.render(<ShowResultsFromAPI apiQueryDelay={1000}/>, document.getElementById("root"));
```
