import React, { Component } from 'react';

class SearchActorComponent extends Component {
  constructor(props) {
    super(props);
  }

  //https://github.com/enkidevs/react-search-input/blob/master/src/index.js

  render() {
    return (
      <div>
        <input placeholder="SEARCH BY TITLE" />
      </div>
    );
  }
}

export default SearchActorComponent;
