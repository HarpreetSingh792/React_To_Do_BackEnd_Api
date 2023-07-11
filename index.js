import { _dbConnect } from "./server.js";
import express from "express";
export const app = express();
import { config } from "dotenv";
import userRoutes from "./routes/user.js"
import taskRoutes from "./routes/task.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errors.js";


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FrontEnd_URL,
    methods:['GET','POST','PUT','DELTE'],
    credentials:true
}))
app.use("/api/v1/user/",userRoutes);
app.use("/api/v1/task/",taskRoutes);
app.use(errorMiddleware);
config({
    path:"./data/key.env"
})

const port = process.env.port||4000;
_dbConnect();


app.listen(port, (err) => {
    if (err) {
        console.warn(err);
    }
    else {

        console.log(`Connected to port: ${port}`)
    }
})