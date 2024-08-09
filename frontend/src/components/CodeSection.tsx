import { useRecoilState, useSetRecoilState } from "recoil";
import { CodeEditor } from "./CodeEditor";
import { OpenedFiles } from "./OpenedFiles";
import { RunButton } from "./RunButton";
import {
    AwaitingCodeResponseAtom,
    CodeResponseAtom,
} from "../store/atoms/atoms";

export const CodeSection = () => {
    const [loading, setLoading] = useRecoilState(AwaitingCodeResponseAtom);

    const setCodeResponse = useSetRecoilState(CodeResponseAtom);

    const onClickRun = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setCodeResponse(
                "Template Code Response... Template Code Response... Template Code Response..."
            );
        }, 4000);
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
                <div className="w-full h-full flex justify-end items-center p-2">
                    <RunButton onClick={onClickRun} loading={loading} />
                </div>
            </div>
        </div>
    );
};
