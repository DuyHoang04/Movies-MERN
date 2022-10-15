import { createSlice } from "@reduxjs/toolkit";
import {
  getGenres,
  fetchMovies,
  fetchMoviesByGenre,
  getVideoMovies,
  getCasts,
  fetchMoviesByTvShows,
} from "./apiMovies";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  videos: [],
  casts: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.genresLoaded = false;
    });
    builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.genresLoaded = false;
    });
    builder.addCase(getVideoMovies.fulfilled, (state, action) => {
      state.videos = action.payload;
    });
    builder.addCase(getCasts.fulfilled, (state, action) => {
      state.casts = action.payload;
    });
    builder.addCase(fetchMoviesByTvShows.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.genresLoaded = false;
    });
  },
});

export const selectMovies = (state) => state.movies.movies;
export const selectGenresLoaded = (state) => state.movies.genresLoaded;
export const selectGenres = (state) => state.movies.genres;
export const selectVideos = (state) => state.movies.videos;
export const selectCasts = (state) => state.movies.casts;

export default moviesSlice.reducer;
