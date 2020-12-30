import React from 'react';

const MovieListItem = (props) => {


    return (
        <div className="movielistitem">
        <div className="movielistpic"><img src={"https://image.tmdb.org/t/p/w154" + props.movie.poster_path} alt={props.movie.title} width="135" height="200"></img></div>
            <div className="movielisttitle"><span>{props.movie.title}</span>
            {/* <span>{props.movie.tagline}</span> */}
            {props.addSearch ? <div><button className="addMovie" onClick={(e) => {e.preventDefault(), props.addMovie(props.movie)}}>Add</button></div> : 
            <div className="buttons"><div className={props.movie.watched === false ? "notwatched" : "watchedmovie"} 
                 onClick={() => {props.toggleWatched(props.movie._id)}}>{props.movie.watched === false ? "+ Watched" : "+ To Watch"}</div>
                 <button className="trash" onClick={() => {props.deleteMovie(props.movie._id)}}><i className="fas fa-trash-alt" ></i></button></div>}
            </div>
        </div>
    )
}

export default MovieListItem;