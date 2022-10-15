import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import { PlayCircleFilled, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ListMoreCard = ({ movie }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const username = JSON.parse(localStorage.getItem("user"))?.username;

  const handleRemove = async () => {
    if (username) {
      await axios.post("/users/myList/remove", { username, IdMovie: movie.id });
    }
  };

  return (
    <Container>
      <div className="background">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt="" />
        <Link to="/movie" state={movie}>
          <PlayCircleFilled className="icon" />
        </Link>
      </div>
      <div className="info">
        <Link to="/movie" state={movie}>
          <div className="list-card__name">{movie?.name}</div>
        </Link>
        {pathname === "/mylist" ? (
          <IconButton onClick={handleRemove}>
            <Delete />
          </IconButton>
        ) : (
          <span className="rating">{movie?.rating}</span>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  padding: 10px;
  color: white;
  margin-bottom: 30px;
  cursor: pointer;
  a {
    color: white;
    text-decoration: none;
  }
  .background {
    position: relative;
    overflow: hidden;
    img {
      transition: all 0.5s ease;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 5rem;
      display: none;
      transition: all 0.5s ease;
      }
      &:hover {
        img {
          filter: blur(4px);
          transform: scale(1.2)
        }
        .icon {
          display: block;
        }
      }
    }
  }
  .info {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list-card__name {
      margin-top: 10px;
      color: gray;
      font-weight: bold;
      transition: all 0.2s;

      &:hover {
        color: crimson;
      }
    }
    svg {
      color: crimson;
    }
    .rating {
      font-size: 14px;
      border: 2px solid crimson;
      color: crimson;
      padding: 0 5px;
    }
  }
`;

export default ListMoreCard;
