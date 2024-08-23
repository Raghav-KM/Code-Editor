import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CodeEditor } from "./CodeEditor";
import { OpenedFiles } from "./OpenedFiles";
import { LoaderButton } from "./LoaderButton";
import {
    AwaitingCodeResponseAtom,
    ClearCodeAtom,
    CodeResponseAtom,
    CodeResponseType,
    FilesAtom,
    FileType,
    SelectedFileIdAtom,
} from "../store/atoms/atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { CopyIcon } from "../assets/icons/CopyIcon";
import { ReloadIcon } from "../assets/icons/ReloadIcon";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as String;

export const CodeSection = () => {
    const [loading, setLoading] = useRecoilState(AwaitingCodeResponseAtom);
    const [code_id, setCodeId] = useState("");

    const [files, setFiles] = useRecoilState(FilesAtom);
    const selectedFileId = useRecoilValue(SelectedFileIdAtom);

    const setClearCode = useSetRecoilState(ClearCodeAtom);
    const setCodeResponse = useSetRecoilState(CodeResponseAtom);

    const onClickRun = async () => {
        try {
            const selectedFile = files.filter(
                (file: FileType) => file.id == selectedFileId
            );

            const response = await axios.post(
                `${BACKEND_URL}/api/code/execute`,
                {
                    file_id: selectedFileId,
                    code: selectedFile[0].code,
                }
            );

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
                        `${BACKEND_URL}/api/code/check`,
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

    const onReload = () => {
        setFiles(() => {
            const updatedFiles = files.map((file: FileType) =>
                file.id == selectedFileId
                    ? { ...file, code: "", saved: false }
                    : file
            );
            localStorage.setItem("files", JSON.stringify(updatedFiles));
            return updatedFiles;
        });
        setClearCode((c) => c + 1);
    };
    const onCopy = () => {
        const selectedFile = files.filter(
            (file: FileType) => file.id == selectedFileId
        );
        navigator.clipboard.writeText(selectedFile[0].code);
    };

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
                    <div className="w-full h-full flex flex-row items-center justify-between px-4">
                        <div className="h-fit flex flex-row">
                            <div onClick={onCopy} title="Copy to Clipboard">
                                <CopyIcon
                                    className={
                                        "size-12 text-white cursor-pointer hover:bg-secondary-light p-3 rounded"
                                    }
                                />
                            </div>
                            <div onClick={onReload} title="Clear Code">
                                <ReloadIcon
                                    className={
                                        "size-12 text-white cursor-pointer hover:bg-secondary-light p-3 rounded"
                                    }
                                />
                            </div>
                        </div>
                        <LoaderButton
                            onClick={onClickRun}
                            loading={loading}
                            label={"Run"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
