import express from "express";
import { createUser, getUsers,getUser, updateUser, deleteuser} from "../controllers/users.js";
const router = express.Router();
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:Id",getUser);
router.delete("/:Id", deleteuser);
router.patch("/:Id",updateUser);
export default router;
