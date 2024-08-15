import { z } from "zod";

export type STATUS =
    | "Success"
    | "Executing"
    | "Compiler-Error"
    | "Pending"
    | "Execution-Error";

export type RESULT = {
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

export type CodeResponseType = {
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
