import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: null,
    password: null,
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const ValidateForm = () => {
    const { password, username } = credentials;
    if (!password & !username) {
      toast.error("Không được bỏ trống ô nào cả nha!", toastOptions);
    } else if (!username) {
      toast.error("Phải có UserName vs Password", toastOptions);
      return false;
    } else if (!password) {
      toast.error("Phải có UserName vs Password", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ValidateForm()) {
      const { data } = await axios.post("/auth/login", credentials);
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        toast.error("Please try again.", toastOptions);
      }
    }
  };

  return (
    <>
      <Container>
        <form>
          <div className="brand">
            <h1>Đăng nhập</h1>
          </div>
          <input
            type="text"
            placeholder="UserName"
            name="username"
            id="username"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
          <span>
            Do not have an account ? <Link to="/register">Register.</Link>
          </span>
        </form>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  background: url("https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg");
  object-fit: cover;
  object-contain: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      background: -webkit-linear-gradient(#eee, #333);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 2rem;
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #000;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid crimson;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid crimson;
    }
  }

  button {
    background-color: crimson;
    color: white;
    padding: 1rem 2rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: all 0.4s;
    &:active {
      transform: scale(0.95);
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    a {
      color: crimson;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
