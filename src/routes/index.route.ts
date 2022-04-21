import express from 'express';
import categoriesRoute from './categories.route';

const app = express();

app.use('/categories', categoriesRoute);


export default app;