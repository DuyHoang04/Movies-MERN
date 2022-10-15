import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectGenres } from "../redux/movieSlice";
import { fetchMoviesByGenre } from "../redux/apiMovies";

const SelectGenres = () => {
  const genres = useSelector(selectGenres);
  const dispatch = useDispatch();

  return (
    <Container>
      <select
        name="genre"
        id="genre"
        onChange={(e) => {
          dispatch(
            fetchMoviesByGenre({ type: "movie", genre: e.target.value })
          );
        }}
      >
        <option>Genre</option>
        {genres.map((genre) => (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 0 20px 10px;
  select {
    cursor: pointer;
    background-color: #000;
    border: 1px solid white;
    color: white;
    padding: 5px;
  }
`;

export default SelectGenres;
