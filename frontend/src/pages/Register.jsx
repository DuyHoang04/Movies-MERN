import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: null,
    password: null,
    confirmPassword: null,
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     navigate("/");
  //   }
  // }, []);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleValidation = () => {
    const { password, confirmPassword, username } = credentials;
    if (!password || !confirmPassword || !username) {
      toast.error("Không được bỏ trống ô nào cả nha!", toastOptions);
    } else if (password !== confirmPassword) {
      toast.error(
        "Mật khẩu với xác nhận mật khẩu không giống nhau",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error("UserName không được it hơn 3 kí tự", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password phải có hơn 8 kí tự", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = credentials;
      const { data } = await axios.post(`/auth/register`, {
        username,
        password,
      });
      if (data.status === false)
        return toast.error(`${data.msg}`, toastOptions);
      if (data.status) {
        toast.success(`${data.msg}`, toastOptions);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  return (
    <>
      <Container>
        <form>
          <div className="brand">
            <h1>Đăng kí</h1>
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            id="confirmPassword"
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Create User
          </button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
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

export default Register;
