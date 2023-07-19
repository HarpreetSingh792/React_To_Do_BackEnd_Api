import { UserModel } from "../models/users.js";
import bcrypt from "bcrypt";
import { jwtToken } from "../utils/features.js";
import ErrorHandler from "../middlewares/errors.js";


export const userDetails = async (req, res, next) => {

    try {
        const { id } = req.user;
        const user = await UserModel.findById(id);
        res.status(200).json({
            success: "true",
            user
        });
    } catch (error) {
        next(error);
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }).select("+password");
        const hashedPass = user.password;
        const isMatch = await bcrypt.compare(password, hashedPass);
        if (!user) return next(new ErrorHandler(404, "Invalid email and password"));
        if (!isMatch) return next(new ErrorHandler(404, "Invalid email and password"));
        const id = user._id;
        jwtToken(user._id,res, `Welcome Back ${user.name}`,200);
    } catch (error) {
        next(error);
    }
}


export const userRegister = async (req, res, next) => {
    try {

        const { email, name, password } = req.body;   
        let hashedData = await bcrypt.hash(password, 15);
        let user = await UserModel.findOne({ email });
        if (user) return next(new ErrorHandler(404,"Email already exists"));

        user = await UserModel.create({
            name,
            email,
            password: hashedData
        });
        jwtToken(user._id,res, "Created Successfully",201);
        res.json({"Hooray":"horray"});
    } catch (error) {
        next(error)
    }
}