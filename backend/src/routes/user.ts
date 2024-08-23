import { PrismaClient } from "@prisma/client";
import express from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import { authMiddleware, JWT_SECRET } from "../middlewares/auth";

export const router = express.Router();
const prisma = new PrismaClient();

const signup_schema = zod.object({
    fullName: zod.string(),
    userName: zod.string().min(1),
    password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
    const result = signup_schema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            message: result.error.errors,
        });
        return;
    }

    try {
        const user_exist = await prisma.user.findUnique({
            where: {
                userName: req.body.userName,
            },
        });

        if (user_exist) {
            res.status(400).json({
                message: "UserName already in use",
            });
            return;
        }

        const created_user = await prisma.user.create({
            data: req.body,
        });

        res.json({
            message: "User signup successful",
            token: jwt.sign(
                {
                    userName: created_user.userName,
                    fullName: created_user.fullName,
                    userId: created_user.id,
                },
                JWT_SECRET,
                { expiresIn: "1h" }
            ),
        });
    } catch (ex) {
        res.status(500).json({
            message: "User signup failed",
        });
    }
});

const signin_schema = zod.object({
    userName: zod.string().min(1),
    password: zod.string().min(6),
});
router.post("/signin", async (req, res) => {
    const result = signin_schema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            message: result.error.errors,
        });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                userName: req.body.userName,
                password: req.body.password,
            },
        });

        if (!user) {
            res.status(401).json({
                message: "Invalid Email or Password",
            });
            return;
        }

        res.json({
            message: "User signin successful",
            token: jwt.sign(
                {
                    userName: user.userName,
                    fullName: user.fullName,
                    userId: user.id,
                },
                JWT_SECRET,
                { expiresIn: "1h" }
            ),
        });
    } catch (ex) {
        res.status(500).json({
            message: "User signin failed",
        });
    }
});

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                userName: req.body.userName,
            },
        });

        if (!user) {
            res.status(401).json({});
            return;
        }
        res.json({});
    } catch (ex) {
        res.status(401).json({});
    }
});

export default router;
