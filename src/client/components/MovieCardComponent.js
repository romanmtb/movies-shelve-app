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
    const filmStars = this.state.isOpen && <p>{this.props.stars}</p>;

    return (
      <div className="movie-dashboard__card card" style={{ margin: '10px' }}>
        <div className="card-body">
          <button
            className="btn btn-outline-dark"
            style={{ margin: '4px' }}
            onClick={() => this.props.deleteHandler(this.props.id)}
          >
            DELETE
          </button>

          <button
            className="btn btn-outline-dark"
            style={{ margin: '4px' }}
            onClick={this.handleClick}
          >
            {this.state.isOpen ? 'CLOSE' : 'OPEN'}
          </button>

          <h6>ID {this.props.id}</h6>
          <h5>{this.props.title}</h5>
          <h6>{this.props.release}</h6>
          <h6>{this.props.format}</h6>
          {filmStars}
        </div>
      </div>
    );
  }
}

export default MovieCardComponent;
