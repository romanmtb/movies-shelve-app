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

    const filmInfo = !this.state.isOpen && (
      <div>
        <h6>ID {this.props.id}</h6>
        <h6 className="card-text">{this.props.release}</h6>
        <h6 className="card-text">{this.props.format}</h6>
      </div>
    );

    return (
      <div className="col-sm-6 col-lg-4">
        <div
          className="movie-dashboard__card card"
          style={{ marginBottom: '30px', height: '315px', width: '315px' }}
        >
          <div className="card-body">
            <div
              className="container text-center"
              style={{ marginBottom: '20px' }}
            >
              <div className="btn-group">
                <button
                  className="btn btn-outline-dark"
                  onClick={() => this.props.deleteHandler(this.props.id)}
                >
                  DELETE
                </button>

                <button
                  className="btn btn-outline-dark"
                  onClick={this.handleClick}
                  style={{ width: '85px' }}
                >
                  {this.state.isOpen ? 'INFO' : 'STARS'}
                </button>
              </div>
            </div>

            <h5 className="card-title">{this.props.title}</h5>
            {filmInfo}
            {filmStars}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCardComponent;
