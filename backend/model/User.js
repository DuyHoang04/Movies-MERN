import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSChema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    saveMovies: Array,
  },
  { timestamps: true }
);

UserSChema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, result) => {
    this.password = result;
    next(err);
  });
});

const User = mongoose.model("User", UserSChema);

export default User;
