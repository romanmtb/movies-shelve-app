import React, { Component } from 'react';
import MovieCardComponent from './MovieCardComponent'

class MovieDashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    

    render() {
        return (
            <div className="movie-dashboard">
                <MovieCardComponent
                    movieData={this.props.movieData}
                />
            </div>
        );
    }
}

export default MovieDashboardComponent;