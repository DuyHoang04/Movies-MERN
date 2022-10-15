import React from "react";
import List from "./List";
import { memo } from "react";

const SliderMovies = ({ listMovies }) => {
  const getMoviesFromList = (from, to) => {
    return listMovies.slice(from, to);
  };

  return (
    <div>
      <List data={getMoviesFromList(0, 10)} title="Trending Now" />
      <List data={getMoviesFromList(10, 20)} title="New Releases" />
      <List data={getMoviesFromList(20, 30)} title="Blockbuster Movies" />
      <List data={getMoviesFromList(30, 40)} title="Popular" />
      <List data={getMoviesFromList(40, 50)} title="Action Movies" />
      <List data={getMoviesFromList(50, 60)} title="Epics" />
    </div>
  );
};

export default memo(SliderMovies);
