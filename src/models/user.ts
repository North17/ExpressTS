import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types";

const UserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 20,
  },
  email: {
    type: String,
    required: [true, '"Please provide email'],
    unique: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password as string, salt);
});

UserSchema.methods.createJWT = function () {
  if (process.env.JWT_SECRET) {
    return jwt.sign(
      {
        userID: this._id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin,
      } as JWTPayload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
  }
};

UserSchema.methods.comparePasswords = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", UserSchema);
export default User;
