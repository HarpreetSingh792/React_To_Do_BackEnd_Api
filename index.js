import { _dbConnect } from "./server.js";
import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/user.js"
import taskRoutes from "./routes/task.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errors.js";


export const app = express();
config({
    path:"./data/key.env"
})

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FrontEnd_URL,
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}))

//Routes
app.use("/api/v1/user/",userRoutes);
app.use("/api/v1/task/",taskRoutes);
app.use(errorMiddleware);


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
