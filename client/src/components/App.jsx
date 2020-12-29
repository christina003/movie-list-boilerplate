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
    this.getMovies = this.getMovies.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount(){
    this.getMovies();
  }


  getMovies () {
    axios.get('/movies')
    .then(res => {
      this.setState({
        movies: res.data
      })
    })
  }

  addMovie(movie) {
    axios.post('/movies', movie)
      .then((response) => {
        this.getMovies();
      })
  }

  deleteMovie(id) {
    axios.delete('/movies/' + `${id}`)
    .then((response) => {
      this.getMovies();
    })
  }

  toggleWatched (id) {
    console.log(id);
    axios.patch('/movies/' + `${id}`)
    .then((response) => {
      this.getMovies();
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
        <Movielist movies={this.state.movies.filter(movie => movie.watched === this.state.watched)} toggleWatched={this.toggleWatched} deleteMovie={this.deleteMovie}/>
      </div>
    )
  }

};


export default App;
