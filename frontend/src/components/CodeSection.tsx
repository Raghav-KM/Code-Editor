import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CodeEditor } from "./CodeEditor";
import { OpenedFiles } from "./OpenedFiles";
import { RunButton } from "./RunButton";
import {
    AwaitingCodeResponseAtom,
    CodeResponseAtom,
    CodeResponseType,
    FilesAtom,
    FileType,
    SelectedFileIdAtom,
} from "../store/atoms/atoms";
import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

export const CodeSection = () => {
    const [loading, setLoading] = useRecoilState(AwaitingCodeResponseAtom);
    const [code_id, setCodeId] = useState("");

    const files = useRecoilValue(FilesAtom);
    const selectedFileId = useRecoilValue(SelectedFileIdAtom);

    const setCodeResponse = useSetRecoilState(CodeResponseAtom);

    const onClickRun = async () => {
        try {
            const selectedFile = files.filter(
                (file: FileType) => file.id == selectedFileId
            );

            const response = await axios.post(`${BACKEND_URL}/api/execute`, {
                file_id: selectedFileId,
                code: selectedFile[0].code,
            });

            console.log(response.data);
            setCodeId(response.data.code_id);
            setLoading(true);
        } catch (ex) {
            alert("Code Execution Failed!");
        } finally {
        }
    };

    useEffect(() => {
        let polling_id: number | undefined;
        if (loading && code_id != "") {
            console.log("Polling status...");
            polling_id = setInterval(async () => {
                try {
                    const response = await axios.post(
                        `${BACKEND_URL}/api/check`,
                        {
                            code_id: code_id,
                        }
                    );
                    console.log(response.data);
                    if (response.data.status != "PENDING") {
                        setCodeResponse(response.data as CodeResponseType);
                        setLoading(false);
                    }
                } catch (ex) {
                    console.log(ex);
                    alert("Error!");
                    setLoading(false);
                }
            }, 1500);
        }
        return () => {
            if (polling_id) clearInterval(polling_id);
        };
    }, [loading, code_id]);

    return (
        <div className="w-full h-full bg-primary flex flex-col border-x-4 border-secondary-light">
            <div className="w-full min-h-[7vh]">
                <OpenedFiles />
            </div>
            <div className="w-full h-[85vh] max-h-[85vh] border-b-4 border-secondary-light bg-secondary">
                <CodeEditor />
            </div>
            <div className="w-full min-h-[8vh] bg-secondary ">
                <div
                    className={`w-full h-full flex justify-end items-center p-2 ${
                        selectedFileId == "" ? "hidden" : ""
                    }`}
                >
                    <RunButton onClick={onClickRun} loading={loading} />
                </div>
            </div>
        </div>
    );
};
