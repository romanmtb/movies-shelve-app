import React, { Component } from 'react';
import MovieCardComponent from './MovieCardComponent';

class MovieDashboardComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.movieData;
    return (
      <div className="movie-dashboard card-deck">
        {data.length >= 1 &&
          data.map(item => {
            if (item === null) {
              {
                console.error('---', item, 'Deleted');
              }
            } else {
              return (
                <MovieCardComponent
                  key={Math.round(Math.random() * 20000)}
                  id={item.id}
                  format={item.format}
                  release={item.release}
                  stars={item.stars}
                  title={item.title}
                  img={item.img}
                  deleteHandler={this.props.deleteHandler}
                />
              );
            }
          })}
      </div>
    );
  }
}

export default MovieDashboardComponent;
