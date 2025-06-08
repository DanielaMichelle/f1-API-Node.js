import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        res.status(401).json({ message: "Access token is required" });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) {
            console.log("Token verification failed:", err);
            res.status(403).json({ message: "Invalid token" });
            return;
        }
        next();
    });
}