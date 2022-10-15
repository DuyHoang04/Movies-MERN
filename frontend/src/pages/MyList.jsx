import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ListMore from "./ListMore";
import NoMovies from "../components/NoMovies";

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const username = JSON.parse(localStorage.getItem("user"))?.username;

  useEffect(() => {
    if (username) {
      const getMyList = async () => {
        const {
          data: { movies },
        } = await axios.get(`/users/myList/${username}`);
        setMyList(movies);
      };
      getMyList();
    }
  }, [myList]);

  return (
    <>
      <Header />
      <Container>
        <div className="data">
          {username ? (
            <>
              {myList.length ? (
                <ListMore listMovies={myList} myList={true} />
              ) : (
                <NoMovies />
              )}
            </>
          ) : (
            <p>Vui Lòng Đăng nhập </p>
          )}
        </div>
      </Container>
    </>
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
    p {
      color: white;
      text-align: center;
    }
  }
`;

export default MyList;
