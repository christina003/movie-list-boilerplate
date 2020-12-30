const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Movie = require('../models/movies.js');
const url = require('../mongoURI.js');

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request coming in for ${req.url}`);
  next();
});

const PORT = 3000 || process.env.PORT;

app.use(express.static('public'));



mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to Mongo Database"));

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
    } catch (err) {
    console.log(err);
    res.send(500);
  }
})

app.post('/movies', async (req, res) => {
  const movie = new Movie ({
    adult: req.body.adult,
    backdrop_path: req.body.backdrop_path,
    budget: req.body.budget,
    genre_ids: req.body.genre_ids,
    homepage: req.body.homepage,
    id: req.body.id,
    imdb_id: req.body.imdb_id,
    original_title: req.body.original_title,
    overview: req.body.overview,
    popularity: req.body.popularity,
    poster_path: req.body.poster_path,
    production_companies: req.body.production_companies,
    production_countries: req.body.production_countries,
    release_date: req.body.release_date,
    revenue: req.body.revenue,
    runtime: req.body.runtime,
    spoken_languages: req.body.spoken_languages,
    status: req.body.status,
    tagline: req.body.tagline,
    title: req.body.title,
    video: req.body.video,
    vote_average: req.body.vote_average,
    vote_count: req.body.vote_count,
    watched: req.body.watched
  })

  try {
    const newMovie = await movie.save();
    res.status(200).json(newMovie);
    console.log('successfully added movie');
  } catch (err) {
    res.status(400).json({ message: err });
    console.log(err);
  }
});

app.delete('/movies/:id', getMovie, async (req, res) => {
  try {
    await res.movie.remove();
    res.status(200).send("Movie Deleted");

  } catch (err) {
    res.status(500).json({ message: err });
  }
})

app.patch('/movies/:id', getMovie, async(req, res) => {
  const watched = !res.movie.watched;
  const id = req.params.id;
  try {
    await Movie.findByIdAndUpdate(id, {$set: {watched: watched}});
    res.status(200).send('Movie updated');
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

async function getMovie (req, res, next) {
  let movie;
  try {
    movie = await Movie.findById(req.params.id)
    if (movie === null ) {
      return res.status(404).send("Cannot find movie");
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.movie = movie;
  next();
}



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})