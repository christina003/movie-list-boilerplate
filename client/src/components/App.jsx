import React from 'react';
import Movielist from './Movielist';
import Navbar from "./Navbar";
import TMDB_API_KEY from "../config/tmdb.js";
import axios from 'axios';
// import SearchBar from "./SearchBar";

const TMDBAPI = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=`;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      watched: false,
      addSearch: false,
      addMovieSearch: []
    }
 
    this.addMovie = this.addMovie.bind(this);
    this.toggleWatched = this.toggleWatched.bind(this);
    this.watchedMovies = this.watchedMovies.bind(this);
    this.toWatchMovies = this.toWatchMovies.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.addMovieSearch = this.addMovieSearch.bind(this);
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
    const currentMovies = this.state.movies;

    const exists = currentMovies.some(m => m.id === movie.id);

    if (!exists) {
      movie.watched = false;
      axios.post('/movies', movie)
      .then((response) => {
        this.getMovies();
      })  
    } else {
      alert('This movie is already on your list!');
    }
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
      if (this.state.watched === true || this.state.watched === 'off') {
        this.setState({
          watched: false,
          addSearch: false
        })
      }
  };

  toWatchMovies () {
    if (this.state.watched === false || this.state.watched === 'off') {
      this.setState({
        watched: true,
        addSearch: false
      })
    }
  };

  addMovieSearch(input) {
    if (input.length > 1) {
      this.setState({
        addSearch: !this.state.addSearch,
        watched: 'off'
      })
      axios.get(TMDBAPI + input)
      .then((response) => {
          this.setState({
            addMovieSearch: response.data.results.slice(0,20)
          })
      })
  }
  }


  render() {
    return (
      <div>
        <Navbar watchedMovies={this.watchedMovies} toWatchMovies={this.toWatchMovies} addMovieSearch={this.addMovieSearch}/>
        {/* <SearchBar /> */}
        <Movielist movies={this.state.addSearch ? this.state.addMovieSearch : this.state.movies.filter(movie => movie.watched === this.state.watched)} 
                   toggleWatched={this.toggleWatched} 
                   deleteMovie={this.deleteMovie} 
                   addSearch={this.state.addSearch} 
                   addMovie={this.addMovie}/>
      </div>
    )
  }

};


export default App;
