import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ListMoreCard from "../components/ListMoreCard";
import SelectGenres from "../components/SelectGenres";

const ListMore = ({ listMovies, myList }) => {
  return (
    <Container>
      {myList ? <></> : <SelectGenres />}

      <div className="listCard-container">
        {listMovies?.map((movie, index) => (
          <ListMoreCard key={index} movie={movie} index={index} />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  color: white;
  padding-inline: 2rem;

  .title {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 50px;
    text-transform: uppercase;
  }

  .listCard-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (max-width: 720px) {
    .listCard-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default ListMore;
