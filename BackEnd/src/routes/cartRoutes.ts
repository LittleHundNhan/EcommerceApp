// cartRoutes.ts
import express from "express";
import { addToCart, getCart, updateCartItem, removeCartItem, clearCart } from "../controllers/cartController";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart); // Thêm sản phẩm vào giỏ hàng
cartRouter.get("/:userId", getCart); // Lấy thông tin giỏ hàng
cartRouter.put("/update", updateCartItem); // Cập nhật số lượng sản phẩm
cartRouter.delete("/:userId/:productId", removeCartItem); // Xóa sản phẩm khỏi giỏ hàng
cartRouter.delete("/:userId", clearCart); // Xóa toàn bộ giỏ hàng

export default cartRouter;