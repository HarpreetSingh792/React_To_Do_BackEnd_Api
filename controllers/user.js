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
        jwtToken(res, id, 200, `Welcome Back ${user.name}`);
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
        const { id } = user._id;
        jwtToken(res, id, 201, "Created Successfully");
    } catch (error) {
        next(error)
    }
}