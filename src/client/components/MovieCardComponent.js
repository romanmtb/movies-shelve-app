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
    const filmInfo = this.state.isOpen && (
      <div className="text-center">
        <h6>ID {this.props.id}</h6>
        <h6 className="card-text">{this.props.release}</h6>
        <h6 className="card-text">{this.props.format}</h6>
        <p className="card-text">{this.props.stars}</p>
      </div>
    );

    const filmTitle = !this.state.isOpen && (
      <div>
        <h5 className="card-title text-center">{this.props.title}</h5>
        <img src={this.props.img} className="card-img-bottom" alt="" />
      </div>
    );

    return (
      <div className="col-sm-6 col-lg-4">
        <div
          className="movie-dashboard__card card"
          style={{ marginBottom: '30px', height: '560px', width: '315px' }}
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
                  {this.state.isOpen ? 'TITLE' : 'INFO'}
                </button>
              </div>
            </div>
            {filmTitle}
            {filmInfo}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCardComponent;
