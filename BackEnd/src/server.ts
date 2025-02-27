import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config';
import productRouter from "./routes/productRoutes";
import cartRouter from './routes/cartRoutes';
import categoryRouter from './routes/categoryRoutes';
import multer from "multer";
import bodyParser from "body-parser";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use("/Product", productRouter);
app.use("/Cart", cartRouter);
app.use("/Category", categoryRouter);


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
