import express from 'express';
import router from './routes/index.route';
import dotenv from "dotenv";
dotenv.config();
import { db } from './config/db';


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

db.authenticate().then(() => {
    console.log("Database is conected");
}).catch(console.error);

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server on port ${PORT} eeeee`);
})