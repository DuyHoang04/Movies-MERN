import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../redux/apiMovies";
import { selectGenresLoaded, selectMovies } from "../redux/movieSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import NoMovies from "../components/NoMovies";
import ListMore from "./ListMore";
import Footer from "../components/Footer";

const Movies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const genresLoaded = useSelector(selectGenresLoaded);
  const listMovies = useSelector(selectMovies);

  useEffect(() => {
    dispatch(getGenres({}));
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "movie" }));
  });

  return (
    <Container>
      <Header />
      <div className="data">
        {listMovies.length ? (
          <ListMore listMovies={listMovies} />
        ) : (
          <NoMovies />
        )}
      </div>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default Movies;
