import React, {useState} from 'react';
import TMDB_API_KEY from "../config/tmdb.js";
import axios from 'axios';
const TMDBAPI = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`;

const Navbar = (props) => {
  const [input, setInput] = useState('');

    return (
        <div className='navbar'>
            <a className="home"><i className="fas fa-film"></i>  Reel Keeper</a>
        <div className="add-container">
            <form 
                className="addmovie" 
                onSubmit={(e) => {e.preventDefault(), props.addMovieSearch(input), setInput('')}}
                >
                    <input 
                        onChange={(e) => {setInput(e.target.value)}}
                        type="text"
                        placeholder="Search for movie..."
                        value={input}
                        >       
                    </input>
                        <button>Search</button>
            </form>
        </div>
        <div className="navbarwatched">
            <a className="towatch" onClick={()=>{props.watchedMovies()}}>To Watch</a>
            <a className="watched" onClick={()=>{props.toWatchMovies()}}>Watched</a>
        </div>
        </div>
    )
}


export default Navbar;