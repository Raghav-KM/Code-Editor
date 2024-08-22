import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const JWT_SECRET = "secret_key";

interface DecodedToken {
    userName?: string;
    fullName?: string;
    userId?: string;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = (req as any).headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            message: "Authorization failed",
        });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        if (decoded.userName && decoded.userId && decoded.fullName) {
            req.body.userName = decoded.userName;
            req.body.userId = decoded.userId;
            req.body.fullName = decoded.fullName;

            next();
        } else {
            return res.status(403).json({
                message: "Authorization failed",
            });
        }
    } catch (err) {
        return res.status(403).json({
            message: "Authorization failed",
        });
    }
};
