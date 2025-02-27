import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description:string;
  stock:number;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
    products: [
      { id: '1', name: 'Nike Shoes', price: '$120', image: 'https://source.unsplash.com/200x200/?shoes', description: 'Comfortable running shoes', stock: 10 },
      { id: '2', name: 'Adidas Shoes', price: '$100', image: 'https://source.unsplash.com/200x200/?adidas', description: 'Stylish sneakers', stock: 8 },
    ],
  };
  

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
