import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectGenresLoaded, selectMovies } from "../redux/movieSlice";
import Header from "../components/Header";
import ListMore from "./ListMore";
import NoMovies from "../components/NoMovies";
import Footer from "../components/Footer";

import { fetchMoviesByTvShows } from "../redux/apiMovies";

const TvShows = () => {
  const dispatch = useDispatch();

  const genresLoaded = useSelector(selectGenresLoaded);

  const listMovies = useSelector(selectMovies);

  useEffect(() => {
    dispatch(fetchMoviesByTvShows({ type: "all" }));
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="title">TV SHOW</div>
        <div className="data">
          {listMovies.length ? (
            <ListMore listMovies={listMovies} myList={true} />
          ) : (
            <NoMovies />
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  .title {
    text-align: center;
    margin-top: 8rem;
    color: crimson;
    font-size: 5rem;
    margin-bottom: 5rem;
    font-weight: bold;
  }
  .data {
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default TvShows;
