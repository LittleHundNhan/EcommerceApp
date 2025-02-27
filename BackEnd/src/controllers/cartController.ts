import { Request, Response } from "express";
import Cart from "../models/Cart";
import { Types } from "mongoose"; // Để kiểm tra ObjectId

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ error: "Error adding product to cart" });
    }
};

// Lấy thông tin giỏ hàng
export const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        if (!Types.ObjectId.isValid(userId)) {
            res.status(400).json({ error: "Invalid userId" });
            return;
        }

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching cart" });
    }
};



// Cập nhật số lượng sản phẩm
export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
            res.status(400).json({ error: "Invalid userId or productId" });
            return;
        }

        if (quantity <= 0) {
            res.status(400).json({ error: "Quantity must be greater than 0" });
            return;
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            res.status(404).json({ error: "Cart not found" });
            return;
        }

        const item = cart.items.find((item) => item.product.toString() === productId);

        if (!item) {
            res.status(404).json({ error: "Product not found in cart" });
            return;
        }

        item.quantity = quantity;
        await cart.save();

        res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating cart" });
    }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, productId } = req.params;
  
      if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
        res.status(400).json({ error: "Invalid userId or productId" });
        return;
      }
  
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        res.status(404).json({ error: "Cart not found" });
        return;
      }
  
      const initialItemCount = cart.items.length;
  
      // Dùng phương thức `pull()` của Mongoose để xóa item có `productId`
      cart.items.pull({ product: productId });
  
      if (cart.items.length === initialItemCount) {
        res.status(404).json({ error: "Product not found in cart" });
        return;
      }
  
      await cart.save();
  
      res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error removing product from cart" });
    }
  };

// Xóa toàn bộ giỏ hàng
export const clearCart = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        await Cart.findOneAndDelete({ user: userId });

        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ error: "Error clearing cart" });
    }
};
