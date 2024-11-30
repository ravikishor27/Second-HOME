import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "./../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword }); // to save in a data base we created a new User
  try {
    await newUser.save(); //await is key to make file save with any error interuption, it keep on one process unitl it save
    res.status(201).json("User Created Successfully");
  } catch (error) {
    //res.status(500).json(error.message)  // to catch error and to inform in insomania ui
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  // to authenticate user given correct details or not
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials !"));
    const token = jwt.sign({ id: validUser._id }, process.env.JSW_SECRET_ID);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.eamil });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JSW_SECRET_ID);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar:req.body.photo
      });
      await newUser.save();
      const token = jwt.sign({id:newUser._id}, process.env.JSW_SECRET_ID);
      const {password:pass, ...rest} = newUser._doc;
      res.cookie('access_token', token,{httpOnly: true}).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
