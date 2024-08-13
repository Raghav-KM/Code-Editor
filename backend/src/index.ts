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

type STATUS =
    | "Success"
    | "Executing"
    | "Compiler-Error"
    | "Pending"
    | "Execution-Error";

type RESULT = {
    file_id: string;
    code_id: string;
    compiler: {
        error?: string;
        stderr: string;
        stdout: string;
    };
    executable: {
        error?: string;
        stderr: string;
        stdout: string;
    };
};

type CodeResponseType = {
    file_id: string;
    code_id: string;
    status: "Success" | "Compiler-Error" | "Execution-Error";
    compiler?: {
        stderr: string;
        lexer: string;
        parser: string;
        icode: string;
        asm: string;
    };
    executable?: {
        stderr: string;
        stdout: string;
    };
};

const PORT = 3000;

const execution_status_map: Map<string, STATUS> = new Map();
const execution_result_map: Map<string, RESULT> = new Map();

const generate_uuid = (): string => {
    return uuidv4();
};

const compile_code = async (code_id: string, file_id: string) => {
    exec(
        `./cpp-program/program ./input-code/${code_id}.dc ./asm-code/${code_id}.asm -c -pl -pp -pc`,
        (error, stdout, stderr) => {
            if (error) {
                execution_status_map.set(code_id, "Compiler-Error");

                execution_result_map.set(code_id, {
                    file_id: file_id,
                    code_id: code_id,
                    compiler: {
                        error: error.message,
                        stderr: stderr,
                        stdout: stdout,
                    },
                } as RESULT);
            } else {
                execution_result_map.set(code_id, {
                    file_id: file_id,
                    code_id: code_id,
                    compiler: {
                        stderr: stderr,
                        stdout: stdout,
                    },
                } as RESULT);
                execute_code(code_id, file_id);
            }
        }
    );
};

const execute_code = async (code_id: string, file_id: string) => {
    execution_status_map.set(code_id, "Executing");
    exec(
        
        `nasm -f elf -o ./asm-code/${code_id}.o ./asm-code/${code_id}.asm; 
         ld -m elf_i386 -o ./asm-code/${code_id} ./asm-code/${code_id}.o; ./asm-code/${code_id}; 
         rm -f ./asm-code/${code_id} ./asm-code/${code_id}.o`,

        (error, stdout, stderr) => {
            if (error) {
                execution_status_map.set(code_id, "Execution-Error");
                execution_result_map.set(code_id, {
                    file_id: file_id,
                    code_id: code_id,
                    executable: {
                        error: error.message,
                        stderr: stderr,
                        stdout: stdout,
                    },
                } as RESULT);
            } else {
                execution_status_map.set(code_id, "Success");
                execution_result_map.set(code_id, {
                    ...execution_result_map.get(code_id),
                    executable: {
                        stderr: stderr,
                        stdout: stdout,
                    },
                } as RESULT);
            }
        }
    );
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

    const code_id = generate_uuid();
    execution_status_map.set(code_id, "Pending");

    try {
        await fs.writeFile(
            path.join(`./input-code`, `${code_id}.dc`),
            req.body.code
        );

        compile_code(code_id, req.body.file_id);

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
        } else if (execution_status == "Executing") {
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
