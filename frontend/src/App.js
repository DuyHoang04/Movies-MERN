import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Video from "./pages/Video";
import ListMore from "./pages/ListMore";
import Movies from "./pages/Movies";
import Details from "./components/Details";
import MyList from "./pages/MyList";
import TvShows from "./pages/TvShows";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/video" element={<Video />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/more" element={<ListMore />} />
        <Route path="/movie" element={<Details />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/tv" element={<TvShows />} />
      </Routes>
    </Router>
  );
}

export default App;
