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
    const filmStars = this.state.isOpen && (
      <p className="card-text">{this.props.stars}</p>
    );

    return (
      <div className="col-lg-4">
        <div
          className="movie-dashboard__card card"
          style={{ marginBottom: '60px' }}
        >
          <div className="card-body">
            <button
              className="btn btn-outline-dark"
              style={{ margin: '10px' }}
              onClick={() => this.props.deleteHandler(this.props.id)}
            >
              DELETE
            </button>

            <button
              className="btn btn-outline-dark"
              style={{ margin: '10px' }}
              onClick={this.handleClick}
            >
              {this.state.isOpen ? 'CLOSE' : 'OPEN'}
            </button>

            <h5 className="card-title">{this.props.title}</h5>
            <h6>ID {this.props.id}</h6>
            <h6 className="card-text">{this.props.release}</h6>
            <h6 className="card-text">{this.props.format}</h6>
            {filmStars}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCardComponent;
