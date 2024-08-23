import express from "express";
import zod from "zod";
import { authMiddleware } from "../middlewares/auth";
import { PrismaClient } from "@prisma/client";

export const router = express.Router();

const prisma = new PrismaClient();

router.get("/file/:id", (req, res) => {});
router.delete("/file/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFile = await prisma.code_file.delete({
            where: { id: id },
        });
        res.status(200).json({
            message: "File deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while deleting the file.",
        });
    }
});

router.get("/files", authMiddleware, async (req, res) => {
    try {
        const files = await prisma.code_file.findMany({
            where: { userId: req.body.userId },
        });

        res.status(200).json({
            files: files,
        });
    } catch (ex: any) {
        res.status(500).json({
            message: "ERR! Unable to fetch files",
            error: ex.message,
        });
    }
});

router.put("/file/:id", (req, res) => {});

const put_files_schema = zod.array(
    zod.object({
        id: zod.string(),
        fileName: zod.string(),
        code: zod.string(),
        saved: zod.boolean(),
    })
);

router.put("/files", authMiddleware, async (req, res) => {
    const result = put_files_schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            message: result.error.errors,
        });
        return;
    }

    const files = result.data;

    try {
        const created_files = await Promise.all(
            files.map(async (file) => {
                if (!file.saved) {
                    return prisma.code_file.upsert({
                        where: { id: file.id },
                        update: {
                            fileName: file.fileName,
                            code: file.code,
                        },
                        create: {
                            id: file.id,
                            fileName: file.fileName,
                            code: file.code,
                            userId: req.body.userId,
                        },
                    });
                }
            })
        );
        res.status(200).json({
            message: "Files Uploaded Successfully",
        });
    } catch (ex: any) {
        res.status(500).json({
            message: "ERR! Upload Failed",
        });
        try {
            const created_files = await Promise.all(
                files.map(async (file) => {
                    return prisma.code_file.create({
                        data: {
                            id: file.id,
                            fileName: file.fileName,
                            code: file.fileName,
                            userId: req.body.userId,
                        },
                    });
                })
            );
            res.status(200).json({
                message: "Files Uploaded Successfully",
            });
        } catch (ex: any) {
            res.status(500).json({
                message: "ERR! Upload Failed",
            });
        }
    }
});
