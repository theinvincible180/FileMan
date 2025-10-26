import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import express, {Router} from 'express';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const generateUniqueId = () => {
    return uuidv4();
}

const registerUser = async (req, res) => {
    const {fullName, email, password} = req.body;

    try {
        const existedUser = await User.findOne({email});
        if(existedUser){
            return res.status(400).json({message: "User already exists"});
        }

        if(!fullName || !email || !password){
            return res.status(400).json({message : "All fields are required"});
        }

        if(password.length < 8){
            return res.status(400).json({message : "Password must be at least 8 characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if(fullName.length < 6){
            return res.status(400).json({message : "Full name must be at least 6 characters"});
        }

        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailFormat.test(email)){
            return res.status(400).json({message : "Invalid email format"});
        }

        const cleanedFullName = fullName.trim().replace(/\s+/g, '');
        const userName = `${cleanedFullName.substring(0, 4).toLowerCase()}${generateUniqueId().substring(0,5)}`;

        const idx = Math.random().toString(36).substring(7); // random string
        const profilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`;

        const newUser = new User({
            fullName,
            userName,
            email,
            password: hashedPassword,
            profilePic
        });

        await newUser.save();
        return res.status(201).json({message: "User registered successfully", success: true});
    } catch (error) {
        console.log("Error during registration", error);
        return res.status(500).json({message: "Internal server error"});
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({message: "Logged Out Successfully", success: true});
    } catch (error) {
        console.error("Error during logout", error);
        return res.status(500).json({message: "Error in logging out"});
    }
};

const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } catch(error){
        return res.status(500).json({message: "Error in fetching users"});
    }
};

const getUserById = async (req, res) => {
    const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

const updateUser = async (req, res) => {
    const {userId} = req.params;
    const {userName} = req.body;

    try {
        if(!userName){
            return res.status(400).json({message: "Username is required"});
        }

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {userName},
            {new: true}
        );
    } catch (error) {
        return res.status(500).json({message: "Error updating user"});
    }
}

const deleteUser = async (req, res) => {
    const {userId} = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if(!deletedUser){
            return res.status(404).json({message : "User not found!"});
        }

        return res.status(200).json({message : "User deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "Error deleting user"});
    }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body);
    // const token = req.cookies.token;

    try {
        const user = await User.findOne({email});
        console.log(user);

        if(!user){
            return res.status(400).json({message : "Invalid email or password"});
        }

        if (!user.password) {
            return res.status(400).json({message : "Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message : "Invalid email or password"});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        user.lastlogin = new Date();
        await user.save();

        res.cookie("token", token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 30*24*60*60*1000,
        });

        res.status(200).json({
            success: true,
            message : "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                userName: user.userName,
                email: user.email,
                profilePic: user.profilePic,
                lastlogin: user.lastlogin,
                totalUploads: user.totalUploads,
                totalDownloads: user.totalDownloads,
                documentCount: user.documentCount,
                createdAt: user.createdAt,
            }, 
        });

    } catch (error) {
        console.error("Error during login", error);
        return res.status(500).json({message: "Error logging in"});
    }
}

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.userId;
    next();
  });
};

export {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  verifyToken,
  generateUniqueId,
  logoutUser,
}; 