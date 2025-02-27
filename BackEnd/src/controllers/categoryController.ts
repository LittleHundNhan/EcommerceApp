import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        const category = new Category({
            name,
            description,
        });

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: "Error creating category" });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Error fetching categories" });
    }
};

export const getCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            res.status(404).json({ error: "Category not found" });
            return 
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: "Error fetching category" });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!category) {
            res.status(404).json({ error: "Category not found" });
            return
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: "Error updating category" });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            res.status(404).json({ error: "Category not found" });
            return 
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting category" });
    }
};
