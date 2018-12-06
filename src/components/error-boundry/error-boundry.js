import React, { Component } from 'react';

// components
import ErrorIndicator from '../error-indicator';

// react-element that has ErrorBoundry logic
export default class ErrorBoundry extends Component {
  state = {
    hasError: false
  };

  // on Error in life-cycle methods - [== ERROR-BOUNDARY ==]
  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="jumbotron">
          <ErrorIndicator />
        </div>
      );
    }

    return this.props.children;
  }
}
