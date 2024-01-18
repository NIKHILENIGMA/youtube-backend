import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // console.log("Token value",req.cookies?.accessToken);
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ","");

    if (!token) {
      throw new ApiError(401, "Unauthorized request in authentication");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log(`Middleware :: Decoded header:${JSON.stringify(`ID : ${decodedToken?._id},username : ${decodedToken?.username}`)} `);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access token");
    }
    //@ Custome middleware 
    req.user = user
    next()
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
  } 
});
