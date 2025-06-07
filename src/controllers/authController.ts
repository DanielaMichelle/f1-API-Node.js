import { Request, Response } from "express";
import userModel from "../models/user";
import { User } from "../models/user.iterface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const register = async (req:Request, res:Response): Promise<void> => {
    console.log("Registering user:", req.body);
    
    const { email, password } = req.body as User;
    if(!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }

    try {
        const existingUser = await userModel.findUnique({
        where: { email }
        });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            data: {
                email,
                password: hashedPassword
            }
        })
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as User;
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }

    try {
        const user = await userModel.findUnique({
            where: { email }
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                password: user.password,
                createdAt: user.createdAt
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        )
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}