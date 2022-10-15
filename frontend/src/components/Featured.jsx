import React, { useEffect, useState } from "react";
import { PlayArrow } from "@mui/icons-material";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getVideoMovies } from "../redux/apiMovies";

const Featured = ({ listMovies }) => {
  const dispatch = useDispatch();
  const [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [randomBanner, setRandomBanner] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRandomBanner(listMovies[randomIndex]);
  });

  return (
    <Container>
      <div className="hero">
        <img
          src={`https://image.tmdb.org/t/p/w500${randomBanner?.image}`}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="left">
            <div className="logo">
              <h1>{randomBanner?.name}</h1>
            </div>
            <div className="desc">{randomBanner?.desc}</div>
            <div className="buttons">
              <Link to="movie" state={randomBanner}>
                <button className="play">
                  <PlayArrow className="icon-play" />
                  Play
                </button>
              </Link>
              <Link to="movie">
                <button>More Info</button>
              </Link>
            </div>
          </div>
          <div className="right">
            <img
              src={`https://image.tmdb.org/t/p/w500${randomBanner?.poster}`}
              alt=""
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  a {
    text-decoration: none;
  }
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100%;
      width: 100%;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 50%;
        .logo {
          h1 {
            color: white;
            font-size: 4.5rem;
            margin-left: 5rem;
            font-weight: bold;
          }
        }
        .desc {
          color: white;
          margin-left: 5rem;

          font-weight: bold;
        }
        .buttons {
          display: flex;
          margin: 5rem;
          gap: 2rem;
          .play {
            display: flex;
            align-items: center;
            .icon-play {
              font-size: 2rem;
            }
          }
          button {
            font-size: 1.4rem;
            gap: 1rem;
            border-radius: 0.2rem;
            padding: 0.5rem;
            padding-left: 2rem;
            padding-right: 2.4rem;
            border: none;
            cursor: pointer;
            transition: 0.2s ease-in-out;
            &:hover {
              opacity: 0.8;
            }
            &:nth-of-type(2) {
              background-color: rgba(109, 109, 110, 0.7);
              color: white;
              svg {
                font-size: 1.8rem;
              }
            }
          }
        }
      }
      .right {
        overflow: hidden;
        width: 50%;
        width: 300px;
        margin: 0 14rem 14rem 0;
        border-radius: 20px;
        box-shadow: 11px -11px 8px 0px gray;
      }
    }
  }
`;

export default Featured;
