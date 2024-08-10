import express from "express";
import zod from "zod";
import cors from "cors";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

type STATUS = "Success" | "Error" | "Pending";

type RESULT = {
    file_id: string;
    error: string;
    stderr: string;
    stdout: string;
};

const PORT = 3000;

const execution_status_map: Map<string, STATUS> = new Map();
const execution_result_map: Map<string, RESULT> = new Map();

const generate_uuid = (): string => {
    return uuidv4();
};

app.post("/api/execute", async (req, res) => {
    const result = zod
        .object({
            file_id: zod.string(),
            code: zod.string(),
        })
        .safeParse(req.body);

    if (!result.success) {
        res.status(411).json({
            message: "ERR!",
        });
        return;
    }

    const code_id = uuidv4();
    execution_status_map.set(code_id, "Pending");

    try {
        await fs.writeFile(
            path.join(`${__dirname}/../input-code`, `${code_id}.dc`),
            req.body.code
        );

        exec(
            `./cpp-program/program ./input-code/${code_id}.dc ./asm-code/${code_id}.asm -pl -pp -pc -pa`,
            (error, stdout, stderr) => {
                if (error) {
                    execution_status_map.set(code_id, "Error");
                    execution_result_map.set(code_id, {
                        file_id: req.body.file_id,
                        error: error.message,
                        stderr: stderr,
                        stdout: stdout,
                    });
                } else {
                    execution_status_map.set(code_id, "Success");
                    execution_result_map.set(code_id, {
                        file_id: req.body.file_id,
                        error: "",
                        stderr: stderr,
                        stdout: stdout,
                    });
                }
            }
        );

        res.json({
            message: "Executing Code....",
            code_id: code_id,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("ERR! : Unable to execute code");
    }
});

app.post("/api/check", (req, res) => {
    const result = zod
        .object({
            code_id: zod.string(),
        })
        .safeParse(req.body);

    if (!result.success) {
        res.status(411).json({
            message: "ERR!",
        });
        return;
    }

    const code_id = req.body.code_id;
    const execution_status = execution_status_map.get(code_id);
    if (execution_status) {
        if (execution_status == "Pending") {
            res.json({
                status: "PENDING",
            });
        } else {
            res.json({
                status: execution_status,
                ...execution_result_map.get(code_id),
                code_id: code_id,
            });
        }
    } else {
        res.status(411).json({
            message: "ERR! Invalid code id",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
});
