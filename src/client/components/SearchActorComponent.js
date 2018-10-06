import React, { Component } from 'react';

class SearchActorComponent extends Component {
  constructor(props) {
    super(props);
  }

  //https://github.com/enkidevs/react-search-input/blob/master/src/index.js

  render() {
    return (
      <div
        className="input-group input-group-lg col-lg-4"
        style={{ marginBottom: '30px' }}
      >
        <input className="form-control" placeholder="ACTOR..." />
      </div>
    );
  }
}

export default SearchActorComponent;
