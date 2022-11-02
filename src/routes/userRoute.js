const express = require("express");
const UserController = require("../controllers/userController");
const { auth, checkUser } = require("../middlewares/authMiddleware");
const app = express();

const router = express.Router();

const { updateUser, getUser, getAllUsers, deleteUser } = UserController;

router.route("/").get(auth, checkUser("admin"), getAllUsers);
router
  .route("/:id")
  .get(auth, getUser)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

module.exports = router;
