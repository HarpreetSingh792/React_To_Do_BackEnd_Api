import jwt from "jsonwebtoken";

export const jwtToken = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.status(statusCode).cookie("token", token, { maxAge: (15 * 60 * 10000000), httpOnly: true, sameSite: "none", secure: true}).json({
        success: true,
        message: message

    });
}
