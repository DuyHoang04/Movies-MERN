import express from "express";
import {
  getSaveMovies,
  getMyListSave,
  RemoveFormSaveMovies,
} from "../controllers/saveMovies.js";
import {
  DeleteUser,
  getUser,
  UpdateUser,
  getAllUser,
} from "../controllers/user.js";
import { verify } from "../verifyToken.js";
const router = express.Router();

//UPDATE
router.put("/:id", verify, UpdateUser);
//DELETE
router.delete("/:id", verify, DeleteUser);
//GET USER
router.get("/find/:id", getUser);
//GET ALL USER
router.get("/", verify, getAllUser);

//SaveMovies
router.post("/save", getSaveMovies);

router.get("/myList/:username", getMyListSave);
router.post("/myList/remove", RemoveFormSaveMovies);

export default router;
