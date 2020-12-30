import React from 'react';
import MovieListItem from './MovieListItem';

const Movielist = (props) => {


    return (
        <div className='MovieList'>
        {props.movies.map((movie, index) => (
            <MovieListItem 
                key={movie.title + index}
                value={movie._id}
                movie={movie}
                toggleWatched={props.toggleWatched}
                deleteMovie = {props.deleteMovie}
                addSearch={props.addSearch}
                addMovie={props.addMovie}
                />
        ))}
        </div>
    )
}

export default Movielist;


