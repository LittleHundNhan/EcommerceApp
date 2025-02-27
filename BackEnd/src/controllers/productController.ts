import { Request, Response } from "express";
import Product from "../models/Product";
import Category from "../models/Category";
import { Multer } from "multer";

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

// Tạo sản phẩm mới
export const createProduct = async (req: MulterRequest, res: Response) => {
    try {
        const { name, price, description, stock, categoryId } = req.body;
        const image = req.file ? req.file.path : "";

        // Kiểm tra xem categoryId có hợp lệ không
        const category = await Category.findById(categoryId);
        if (!category) {
            res.status(400).json({ error: "Invalid categoryId" });
            return
        }

        // Tạo sản phẩm mới với categoryId
        const newProduct = new Product({
            name,
            price,
            description,
            stock,
            image,
            categoryId,  // Liên kết với categoryId
        });

        await newProduct.save();

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: "Error creating product" });
    }
};

// Lấy tất cả sản phẩm
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find().populate("categoryId");  // Dùng populate để lấy thông tin category
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id).populate("categoryId");  // Dùng populate để lấy thông tin category
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Cập nhật sản phẩm theo ID
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("categoryId");  // Dùng populate để lấy thông tin category
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Xóa sản phẩm theo ID
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
