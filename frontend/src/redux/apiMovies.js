import { createAsyncThunk, isDraft } from "@reduxjs/toolkit";
import axios from "axios";

export const getGenres = createAsyncThunk("movies/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=112f988402f6f6e0f99599ab9c04682e`
  );
  return genres;
});

const createMovieFromRawData = (movies, setMovies, genres) => {
  movies.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const nameGenre = genres.find(({ id }) => id === genre);
      if (nameGenre) movieGenres.push(nameGenre.name);
    });
    if (movie.backdrop_path) {
      setMovies.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        poster: movie.poster_path,
        genres: movieGenres,
        desc: movie.overview,
        year: movie?.release_date?.slice(0, 4),
        // rating: Math.round(movie?.vote_average),
        rating: movie?.vote_average.toFixed(1),
      });
    }
  });
};

const getRawData = async (api, genres, paging = false) => {
  const setMovies = [];
  for (let i = 1; setMovies.length < 100; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createMovieFromRawData(results, setMovies, genres);
  }
  return setMovies;
};

export const fetchMovies = createAsyncThunk(
  "movies/trending",
  async ({ type }, thunkAPI) => {
    const {
      movies: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `https://api.themoviedb.org/3/trending/${type}/week?api_key=112f988402f6f6e0f99599ab9c04682e`,
      genres,
      true
    );
  }
  // `https://api.themoviedb.org/3/discover/${type}?api_key=112f988402f6f6e0f99599ab9c04682e%with_genres=`
);

export const fetchMoviesByTvShows = createAsyncThunk(
  "movies/tvShows",
  async ({ type }, thunkAPI) => {
    const {
      movies: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=112f988402f6f6e0f99599ab9c04682e`,
      genres,
      true
    );
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  "movies/genre",
  async ({ genre, type }, thunkAPI) => {
    console.log("this", genre, type);
    const {
      movies: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=112f988402f6f6e0f99599ab9c04682e&with_genres=${genre}`,
      genres
    );
  }
);

export const getVideoMovies = createAsyncThunk(
  "movies/video",
  async ({ id }) => {
    const {
      data: { results },
    } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=112f988402f6f6e0f99599ab9c04682e`
    );
    return results;
  }
);

export const getCasts = createAsyncThunk("movies/cast", async ({ id }) => {
  const {
    data: { cast },
  } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=112f988402f6f6e0f99599ab9c04682e`
  );
  return cast;
});
