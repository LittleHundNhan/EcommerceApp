import express from "express";
import multer from "multer";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController";

const productRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Lưu file vào thư mục uploads/
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage })
productRouter.post("/createProduct", upload.single("image"), createProduct); // Tạo sản phẩm
productRouter.get("/getAllProduct", getAllProducts); // Lấy danh sách sản phẩm
productRouter.get("/getProductById/:id", getProductById); // Lấy sản phẩm theo ID
productRouter.put("/updateProductById/:id", updateProduct); // Cập nhật sản phẩm
productRouter.delete("/deleteProduct/:id", deleteProduct); // Xóa sản phẩm

export default productRouter;
