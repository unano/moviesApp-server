import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const TopRatedMovieSchema = new Schema({
  adult: { type: Boolean },
  backdrop_path: { type: String },
  genre_ids: [{ type: Number }],
  id: { type: Number, required: true, unique: true },
  original_language: { type: String },
  original_title: { type: String },
  overview: { type: String },
  popularity: { type: Number },
  poster_path: { type: String },
  release_date: { type: String },
  title: { type: String },
  video: { type: Boolean },
  vote_average: { type: Number },
  vote_count: { type: Number },
});

export default mongoose.model('TopRatedMovies', TopRatedMovieSchema);


