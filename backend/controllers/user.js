import User from "../model/User.js";

export const UpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};

export const DeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json(deleteUser);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUser = await User.findById(id);
    const { password, ...more } = getUser._doc;
    res.status(200).json({ ...more });
  } catch (err) {
    next(err);
  }
};

export const getAllUser = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const getAllUser = await User.find();
      res.status(200).json(getAllUser);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
};
