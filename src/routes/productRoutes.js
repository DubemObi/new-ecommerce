const express = require("express");
const ProductController = require("../controllers/productController");
const { auth, checkUser } = require("../middlewares/authMiddleware");
const app = express();

const router = express.Router();

const {
  createProduct,
  updateProduct,
  getOneProduct,
  getAllProduct,
  deleteProduct,
} = ProductController;
router
  .route("/")
  .post(auth, checkUser("admin"), createProduct)
  .get(auth, getAllProduct);

router.delete("/:id", auth, checkUser("admin"), deleteProduct);

router.get("/:id", auth, getOneProduct);

router.put("/:id", auth, checkUser("admin"), updateProduct);
module.exports = router;
