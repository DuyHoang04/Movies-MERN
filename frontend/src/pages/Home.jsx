import React, { useEffect, useMemo, useState } from "react";
import Featured from "../components/Featured";
import Header from "../components/Header";

import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../redux/apiMovies";
import { selectGenresLoaded, selectMovies } from "../redux/movieSlice";
import SliderMovies from "../components/SliderMovies";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useDispatch();
  const genresLoaded = useSelector(selectGenresLoaded);
  const listMovies = useSelector(selectMovies);

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    dispatch(getGenres({}));
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  });

  return (
    <div>
      <>
        <Header />
        <Featured listMovies={listMovies} />
        <SliderMovies listMovies={listMovies} />
        <Footer />
      </>
      <ToastContainer />
    </div>
  );
};

export default Home;
