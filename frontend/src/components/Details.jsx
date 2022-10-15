import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { selectCasts } from "../redux/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCasts, getVideoMovies } from "../redux/apiMovies";

const Details = () => {
  const location = useLocation();
  const movie = location.state;
  const dispatch = useDispatch();
  const casts = useSelector(selectCasts).slice(0, 5);
  const id = movie.id;

  // get diễn viên
  useEffect(() => {
    dispatch(getCasts({ id }));
  }, []);

  //get Trailer phim rôif lưu vào state
  useEffect(() => {
    dispatch(getVideoMovies({ id }));
  }, []);

  return (
    <>
      <Header />
      <Container
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.image})`,
        }}
      >
        <div className="container">
          <div className="poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster}`}
              alt=""
            />
            <Link to="/video">
              <button>Xem Trailer</button>
            </Link>
          </div>
          <div className="info">
            <div className="title">{movie.name}</div>
            <div className="genres">
              <ul>
                {movie.genres.map((genre, index) => (
                  <li key={index} className="genre">
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
            <div className="desc">{movie.desc}</div>
            <div className="casts-title">Diễn Viên</div>
            <div className="casts">
              {casts.map((cast) => (
                <div className="cast">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                    alt=""
                  />
                  <span className="cast-name">{cast?.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    display: flex;
    align-items: center;
    z-index: 100;
    gap: 2rem;
    .poster {
      width: 330px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      img {
        border-radius: 20px;
      }
      button {
        width: 120px;
        background-color: crimson;
        padding: 8px 0;
        color: white;
        font-weight: bold;
        border: none;
        outline: none;
        border-radius: 10px;
        transition: all 0.5s ease;
        &:active {
          transform: scale(0.9);
        }
      }
    }
    .info {
      color: white;
      .title {
        font-size: 3rem;
        font-weight: bold;
      }
      ul {
        margin-top: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        li {
          padding: 5px 8px;
          list-style-type: none;
          border: 2px solid white;
          font-weight: 500;
          border-radius: 10px;
        }
      }
      .desc {
        margin-top: 2rem;
        width: 700px;
      }
    }
    .casts-title {
      color: white;
      font-size: 21px;
      font-weight: bold;
      margin-top: 20px;
    }
    .casts {
      display: flex;
      gap: 1rem;

      .cast {
        display: flex;
        align-items: center;
        flex-direction: column;
        img {
          width: 150px;
          border-radius: 20px;
        }
      }
    }
  }
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(200, 200, 200);
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 100%);
  }
`;

export default Details;
