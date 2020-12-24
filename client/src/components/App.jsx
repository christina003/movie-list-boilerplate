import React from 'react';
import Movielist from './Movielist';
import Navbar from "./Navbar";
import TMDB_API_KEY from "../config/tmdb.js";
import axios from 'axios';
// import SearchBar from "./SearchBar";

const TMDBAPI = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`;


const movies = [
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      allMovies: [],
      watched: false
    }
 
    this.addMovie = this.addMovie.bind(this);
    this.toggleWatched = this.toggleWatched.bind(this);
    this.watchedMovies = this.watchedMovies.bind(this);
    this.toWatchMovies = this.toWatchMovies.bind(this);
  }



  addMovie (input) { 
    const movies = [...this.state.movies];
    axios.get(TMDBAPI + input)
      .then((response) => {
        const newMovie = {watched: false, ...response.data.results[0]};
        movies.push(newMovie);
        this.setState({
          movies: movies
        })
      })
  }

 

  toggleWatched (title) {
    const movies = [...this.state.movies];
    movies.forEach(movie => {
      if (movie.title === title) {
        movie.watched = !movie.watched;
      }
    });
    this.setState({
      movies: movies
    })
  }

  watchedMovies () {
      if (this.state.watched === true) {
        this.setState({
          watched: false
        })
      }
  };

  toWatchMovies () {
    if (this.state.watched === false) {
      this.setState({
        watched: true
      })
    }
  };


  render() {
    return (
      <div>
        <Navbar addMovie={this.addMovie} watchedMovies={this.watchedMovies} toWatchMovies={this.toWatchMovies}/>
        {/* <SearchBar /> */}
        <Movielist movies={this.state.movies.filter(movie => movie.watched === this.state.watched)} toggleWatched={this.toggleWatched}/>
      </div>
    )
  }

};


export default App;
