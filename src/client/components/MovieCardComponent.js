import React, { Component } from 'react';

class MovieCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const filmStars = this.state.isOpen && <li>{this.props.stars}</li>;

    return (
      <div className="movie-dashboard__card">
        <ul>
          <li>
            <button onClick={() => this.props.deleteHandler(this.props.id)}>
              Remove
            </button>
          </li>

          <li>
            <button onClick={this.handleClick}>
              {this.state.isOpen ? 'Close' : 'Open'}
            </button>
          </li>
          <li>id {this.props.id}</li>
          <li>{this.props.title}</li>
          <li>{this.props.format}</li>
          <li>{this.props.release}</li>
          {filmStars}
        </ul>
      </div>
    );
  }
}

export default MovieCardComponent;
