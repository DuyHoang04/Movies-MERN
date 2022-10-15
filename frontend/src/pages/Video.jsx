import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getVideoMovies } from "../redux/apiMovies";
import { useEffect } from "react";
import { selectVideos } from "../redux/movieSlice";
import { useLocation } from "react-router-dom";
const Video = () => {
  const [trailerId, setTrailerId] = useState("");

  const videos = useSelector(selectVideos);

  const getTrailer = () => {
    const trailer = videos?.find((video) => video.type === "Trailer");
    setTrailerId(trailer?.key);
  };

  useEffect(() => {
    getTrailer();
  }, []);

  return (
    <Container>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${trailerId}`}
        title="Responsive React Movies App With API | ReactJS Movies | ReactJS Tutorial"
      ></iframe>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  .back {
    display: flex;
    align-items: center;
    color: white;
    cursor: pointer;
    z-index: 2;
  }
`;

export default Video;
