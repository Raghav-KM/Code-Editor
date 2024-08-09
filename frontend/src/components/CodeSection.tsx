import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CodeEditor } from "./CodeEditor";
import { OpenedFiles } from "./OpenedFiles";
import { RunButton } from "./RunButton";
import {
    AwaitingCodeResponseAtom,
    CodeResponseAtom,
    SelectedFileIdAtom,
} from "../store/atoms/atoms";

export const CodeSection = () => {
    const [loading, setLoading] = useRecoilState(AwaitingCodeResponseAtom);
    const selectedFileId = useRecoilValue(SelectedFileIdAtom);

    const setCodeResponse = useSetRecoilState(CodeResponseAtom);

    const onClickRun = () => {
        setLoading(true);
        setTimeout(
            ({ id }: { id: string }) => {
                setLoading(false);
                setCodeResponse({
                    response_id: "",
                    file_id: id,
                    status: "Error",
                    stderr: "Code Error.... Code Error.... Code Error.... Code Error.... Code Error....",
                    stdout: "Code Output.... Code Output.... Code Output.... Code Output.... Code Output....",
                });
            },
            4000,
            { id: selectedFileId }
        );
    };

    return (
        <div className="w-full h-full border-4 border-black p-2 flex flex-col gap-2">
            <div className="w-full h-16 border border-black">
                <OpenedFiles />
            </div>
            <div className="w-full flex-grow border border-black">
                <CodeEditor />
            </div>
            <div className="w-full h-16 border border-black">
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
