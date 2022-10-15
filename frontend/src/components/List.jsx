import React, { useRef, useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import ListItem from "./ListItem";
import styled from "styled-components";
import { memo } from "react";

const List = ({ data, title }) => {
  const [isArrowBack, setIsArrowBack] = useState(false);
  const [isArrowForward, setIsArrowForward] = useState(true);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsArrowBack(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      slideNumber === 1 ? setIsArrowBack(false) : setIsArrowForward(true);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 4) {
      setSlideNumber(slideNumber + 1);
      slideNumber === 3 && setIsArrowForward(false);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <Container>
      <div className="title">
        <span className="listTitle">{title}</span>
      </div>
      <div className="wrapper">
        <ArrowBack
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isArrowBack && "none" }}
        />
        <div className="container" ref={listRef}>
          {data.map((item, index) => (
            <ListItem key={index} index={index} item={item} />
          ))}
        </div>
        <ArrowForward
          className="sliderArrow right"
          onClick={() => handleClick("right")}
          style={{ display: !isArrowForward && "none" }}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 40px;

  .title {
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .listTitle {
      color: white;
      font-size: 20px;
      font-weight: 500;
      margin-left: 50px;
    }
    .listMore {
      display: flex;
      align-items: center;
      margin-right: 30px;
      transition: all 0.3s;
      &:hover {
        color: crimson;
      }
    }
  }

  .wrapper {
    position: relative;
    .sliderArrow {
      width: 50px;
      height: 100%;
      background-color: rgb(22, 22, 22, 0.5);
      color: white;
      position: absolute;
      z-index: 99;
      top: 0;
      bottom: 0;
      margin: auto;
      cursor: pointer;

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
      }
    }
    .container {
      margin-left: 50px;
      display: flex;
      margin-top: 10px;
      width: max-content;
      transform: translateX(0px);
      transition: all 1s ease;
    }
  }
`;

export default memo(List);
