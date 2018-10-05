import React, { Component } from 'react';

class MovieCardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    

    render() {
        const films = this.props.movieData
            console.log(films)
        return (
            <div className="movie-dashboard__card">
                {films[0].title}
            </div>
        );
    }
}

export default MovieCardComponent;