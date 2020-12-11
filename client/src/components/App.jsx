import React from 'react';
import MoviesList from './MoviesList.jsx';
import SearchBar from './SearchBar.jsx';
import AddBar from './AddBar.jsx';

const movies = [
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies
    };
    this.searchMovies = this.searchMovies.bind(this);
    this.addMovies = this.addMovies.bind(this);
    //this.resetMovies = this.resetMovies.bind(this);
  }

  //Filters movie function
  searchMovies(input) {
    let lcInput = input.toLowerCase();
    const oldMovies = [...this.state.movies];
    let filterMovies = [];
    for (let i = 0; i < movies.length; i++) {
      let lcMovie = movies[i].title.toLowerCase();
      if (lcMovie.includes(lcInput)){
       filterMovies.push(movies[i]);
      }
    }

    if (filterMovies.length === 0) {
      alert('Sorry, no movie titles match your search :(')
      this.setState({
        movies: oldMovies
      })
    } else {
      this.setState({
      movies: filterMovies
  })}
  };

  //Adds a movie title to movie
  addMovies (movie) {
    const movies = [...this.state.movies];
    movies.unshift({title: movie});
    this.setState({
      movies: movies
    })
    console.log(movies);
  };

  // resetMovies () {
  //   this.setState({
  //     movies: movies
  //   })
  //   console.log(this.state.movies);

  // }

  render () {
    return (
      <div id="moviebox">
        <h1>Movie List</h1>
        <AddBar addMovies={this.addMovies} />
        <SearchBar searchMovies={this.searchMovies} resetMovies={this.resetMovies} />
        <MoviesList movies={this.state.movies} />
      </div>
    );
  }
}


export default App;