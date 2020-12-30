const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
        adult: Boolean,
        backdrop_path: String,
        belongs_to_collection: {
          id: Number,
          name: String,
          poster_path: String,
          backdrop_path: String
        },
        budget: Number,
        genres_ids: Number,
        homepage: String,
        id: Number,
        imdb_id: String,
        original_language: String,
        original_title: String,
        overview: String,
        popularity: Number,
        poster_path: String,
        production_companies: [
          {
            id: Number,
            logo_path: String,
            name: String,
            origin_country: String
          }
        ],
        production_countries: [
          {
            iso_3166_1: String,
            name: String
          }
        ],
        release_date: String,
        revenue: Number,
        runtime: Number,
        spoken_languages: [
          {
            english_name: String,
            iso_639_1: String,
            name: String
          }
        ],
        status: String,
        tagline: String,
        title: String,
        video: Boolean,
        vote_average: Number,
        vote_count: Number,
        watched: Boolean
})

module.exports = mongoose.model('Movie', movieSchema);




