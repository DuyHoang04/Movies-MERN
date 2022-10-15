import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  PlayArrow,
  PlayCircleFilled,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  TonalitySharp,
} from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
import { memo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListItem = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const saveMovies = async () => {
    const username = JSON.parse(localStorage.getItem("user"))?.username;
    if (username) {
      try {
        const { data } = await axios.post("/users/save", {
          username,
          data: item,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
    }
  };

  return (
    <>
      <Container>
        <div
          className="listItem"
          style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${item.image}`}
            alt={item.name}
          />
          {isHovered && (
            <div className="trailer-container">
              <video src={item?.trailer} autoPlay={true} loop />
              <div className="itemInfo">
                <div className="icons">
                  <Link to="/movie" state={item}>
                    <PlayArrow className="icon play" />
                  </Link>

                  <Add className="icon" onClick={saveMovies} />
                  <ThumbUpAltOutlined className="icon" />
                  <ThumbDownOutlined className="icon" />
                </div>
                <div className="itemInfoTop">
                  <span>{item.name}</span>
                  <span className="rating">{item.rating}</span>
                  <span>{item?.year}</span>
                </div>

                <div className="genre">
                  <strong>Genre</strong>: {item?.genres?.join(" - ")}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  .listItem {
    width: 225px;
    height: 120px;
    background-color: var(--main-color);
    margin-right: 5px;
    overflow: hidden;
    cursor: pointer;
    color: white;

    a {
      color: white;
      text-decoration: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    video {
      width: 100%;
      height: 140px;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }

    &:hover {
      width: 325px;
      height: 300px;
      position: absolute;
      top: -150px;
      -webkit-box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.07);
      box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.07);
      border-radius: 5px;

      img {
        height: 140px;
      }

      .itemInfo {
        display: flex;
        flex-direction: column;
        padding: 5px;

        .icons {
          display: flex;
          margin-bottom: 10px;
          .icon {
            border-radius: 50%;
            margin-right: 10px;
            font-size: 1.75rem;
            &.play {
              border: 2px solid white;
            }
          }
        }
        .itemInfoTop {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          font-size: 14px;
          font-weight: 600;
          color: gray;

          .rating {
            color: red;
            border: 1px solid crimson;
            padding: 2px 4px;
            margin: 0 10px;
          }
        }

        .desc {
          font-size: 13px;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .genre {
          font-size: 14px;
          color: lightgray;
        }
      }
    }
  }
`;

export default memo(ListItem);
