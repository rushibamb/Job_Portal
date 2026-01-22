import express from "express"
import isAuthenticated from "../middlewares/isAuthinticated.js";
import { login,register,updateProfile ,logout} from "../controllers/user.controller.js"
import singleUpload  from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/updateProfile").post(isAuthenticated,singleUpload,updateProfile);

export default router;
