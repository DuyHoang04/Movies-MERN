import User from "../model/User.js";

export const getSaveMovies = async (req, res, next) => {
  try {
    const { username, data } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const { saveMovies } = user;
      const movieAlreadySave = saveMovies.find(({ id }) => id === data.id);
      if (!movieAlreadySave) {
        await User.findByIdAndUpdate(
          user._id,
          {
            saveMovies: [...user.saveMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie đã có trong list của bạn" });
    }
  } catch (err) {
    next(err);
  }
};

export const getMyListSave = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (user) {
      return res.json({ movies: user.saveMovies });
    } else {
      return res.json({ msg: "Please Try Again!" });
    }
  } catch (err) {
    next(err);
  }
};

export const RemoveFormSaveMovies = async (req, res, next) => {
  try {
    const { username, IdMovie } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const movies = user.saveMovies;
      const MovieIndex = movies.findIndex(({ id }) => id === IdMovie);
      if (!MovieIndex) {
        res.status(400).json({ msg: "Movie not found!" });
      }
      movies.splice(MovieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          saveMovies: movies,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ msg: "Movie removed successfully!", movies });
    } else {
      return res.status(400).json({ msg: "User not found!" });
    }
  } catch (err) {
    next(err);
  }
};
