import React, { useState } from "react";
import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import styled from "styled-components";
import Logo from "../img/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  const { pathname } = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const active = links.findIndex((e) => e.link === pathname);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const LogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""}`}>
        <div className="left">
          <div className="brand">
            <img src={Logo} alt="Logo" />
          </div>
          <ul className="links">
            {links.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`${index === active ? "active" : ""}`}
                >
                  <Link to={item.link}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right">
          {user ? (
            <>
              <div className={`search ${showSearch ? "show-search" : ""}`}>
                <button
                  onFocus={() => setShowSearch(true)}
                  onBlur={() => {
                    if (!inputHover) {
                      setShowSearch(false);
                    }
                  }}
                >
                  <Search className="icon-search" />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  onMouseEnter={() => setInputHover(true)}
                  onMouseLeave={() => setInputHover(false)}
                  onBlur={() => {
                    setShowSearch(false);
                    setInputHover(false);
                  }}
                />
              </div>
              <div className={`profile ${isScrolled && "scrolled"}`}>
                <ArrowDropDown className="icon" />
                <div className="options">
                  <span>Settings</span>
                  <span onClick={LogOut}>Logout</span>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login">
              <div className="login">Login</div>
            </Link>
          )}
        </div>
      </nav>
    </Container>
  );
};

const Container = styled.div`
  a {
    color: white;
    text-decoration: none;
  }
  .scrolled {
    background-color: black;
  }
  nav {
    height: 5rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    transition: 0.3s ease-in-out;
    .left {
      display: flex;
      align-items: center;
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        display: flex;
        align-items: center;
        list-style-type: none;
        gap: 2rem;
        li {
          position: relative;
          a {
            color: white;
            text-decoration: none;
          }
          &::after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            transition: width 0.5s ease;
            height: 3px;
            background-color: crimson;
          }
          &.active::after,
          &:hover::after {
            width: 100%;
          }
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      gap: 1rem;
      .login {
        background-color: crimson;
        color: white;
        padding: 5px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.4s ease;
        &:hover {
          transform: scale(1.1);
        }
      }
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          display: flex;
          align-items: center;
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          .icon-search {
            color: crimson;
            font-size: 1.5rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
    .profile {
      .icon {
        color: white;
      }
      .options {
        display: none;
        background-color: #000;
        border-radius: 5px;
      }

      span {
        color: white;
        padding: 10px;
        cursor: pointer;
      }

      &:hover {
        .options {
          display: flex;
          flex-direction: column;
          position: absolute;
        }
      }
    }
  }
`;

export default Navbar;
