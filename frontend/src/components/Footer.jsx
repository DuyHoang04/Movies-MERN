import React from "react";
import styled from "styled-components";
import bg from "../img/bg.jpg";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";

const Footer = () => {
  return (
    <Container>
      <div className="content">
        <div className="logo">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="menus">
          <div className="menu">
            <Link to="/">Home</Link>
            <Link to="/">Contact us</Link>
            <Link to="/">Term of services</Link>
            <Link to="/">About us</Link>
          </div>
          <div className="menu">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Pravacy policy</Link>
          </div>
          <div className="menu">
            <Link to="/">You must watch</Link>
            <Link to="/">Recent release</Link>
            <Link to="/">Top IMDB</Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 6rem 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    360deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(146, 163, 167, 1) 100%
  );
  a {
    color: white;
    text-decoration: none;
  }

  .content {
    max-width: 1000px;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 200px;
      }
    }

    .menus {
      display: fled;
      justify-content: space-between;

      .menu {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        margin-top: 1rem;
        font-size: 1rem;
        margin-left: 6rem;
      }
    }
  }
`;

export default Footer;
