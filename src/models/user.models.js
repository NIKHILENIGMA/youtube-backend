import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //? CLoudinary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

/// This will encrypt our password
userSchema.pre("save", async function (next) {
  //# Check if password is modified or not 
  if (!this.isModified("password")) return next(); 
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/// We need to check encrypt password which we save in db, matches with user password
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

/// We can create access token using jwt
userSchema.methods.generatorAccessToken = function() {
  return jwt.sign(
    {
      _id:this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
} 

/// We can create a refresh token as well 
userSchema.methods.generatorRefreshToken = function() {
  return jwt.sign(
    {
      _id:this._id,

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
} 

export const User = mongoose.model("User", userSchema);
