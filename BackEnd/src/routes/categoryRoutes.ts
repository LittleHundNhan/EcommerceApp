import express from "express";
import { createCategory, getCategories, getCategory, updateCategory, deleteCategory } from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.post("/addCategory", createCategory); // Tạo mới category
categoryRouter.get("/getAllCategory", getCategories); // Lấy tất cả category
categoryRouter.get("/getCategoryById/:id", getCategory); // Lấy category theo ID
categoryRouter.put("/updateCategoryById/:id", updateCategory); // Cập nhật category
categoryRouter.delete("/deleteCategoryById/:id", deleteCategory); // Xóa category

export default categoryRouter;
