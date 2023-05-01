import express, { Express } from 'express';

import cors from 'cors';

import loginRoutes from './routes/loginRoute';
import productRoutes from './routes/productRoute';
import categoriesRoutes from './routes/categoriesRoute';
import categoryRoutes from './routes/categoryRoute';
import cartRoutes from './routes/cartRoute';
import orderRoutes from './routes/orderRoute';
import searchRoutes from './routes/searchRoute';
import userRoutes from './routes/userRoute';
import secret from './routes/secret';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRoutes);
app.use('/api/product/', productRoutes);
app.use('/api/categories/', categoriesRoutes);
app.use('/api/category/', categoryRoutes);
app.use('/api/cart/', cartRoutes);
app.use('/api/order/', orderRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/search/', searchRoutes);
app.use('/api/secret/', secret);

app.use((req, res, next) => {
  res.status(404).send('This API endpoint does not exist.');
});

export default app;
