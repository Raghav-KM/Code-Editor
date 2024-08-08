import { CopyIcon } from "../assets/icons/CopyIcon";
import { ReloadIcon } from "../assets/icons/ReloadIcon";
import { ShareIcon } from "../assets/icons/ShareIcon";
import { OpenedFiles } from "../components/OpenedFiles";
import { CodeEditor } from "./CodeEditor";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
    awaitingCodeResponseAtom,
    codeResponseAtom,
    filesAtom,
    fileType,
} from "../store/atoms/atoms";
import { PlusIcon } from "../assets/icons/PlusIcon";
import { LoadingButton } from "./LoadingButton";

export const CodeSection = () => {
    const [files, setFiles] = useRecoilState<fileType[]>(filesAtom);
    const setCodeResponse = useSetRecoilState(codeResponseAtom);

    const [loading, setLoading] = useRecoilState(awaitingCodeResponseAtom);

    const onAddFile = () => {
        setFiles([
            ...files,
            {
                id: files.length + 1,
                code: "",
                fileName: "codeE.js",
                saved: false,
            },
        ]);
    };

    const onRunCode = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setCodeResponse("This is the code response.........");
        }, 2000);
    };

    return (
        <div className="w-full h-full bg-secondary-light flex flex-col p-1">
            <div className="w-full h-[7vh] px-0.5 cursor-pointer">
                <div className="w-full h-full bg-primary flex flex-row ">
                    {files.map((file: fileType) => (
                        <OpenedFiles
                            id={file.id}
                            fileName={file.fileName}
                            saved={file.saved}
                            key={file.id}
                        />
                    ))}
                    <div className="h-full flex-grow border-b-4 border-secondary-light"></div>
                    <div
                        className="w-16 p-2 h-full border-s-4 border-b-4 border-secondary-light flex items-center justify-center hover:bg-secondary-light"
                        onClick={onAddFile}
                    >
                        <PlusIcon />
                    </div>
                </div>
            </div>
            <div className="w-full h-[85vh] flex-grow px-0.5 overflow-hidden">
                <div className="w-full h-full bg-secondary p-2">
                    <CodeEditor />
                </div>
            </div>
            <div className="w-full h-[8vh] px-0.5 border-t-4 border-secondary-light">
                <div className="w-full h-full bg-secondary flex justify-between items-center px-6">
                    <div className="flex flex-row items-center gap-2">
                        <div className="hover:bg-secondary-light w-fit h-fit p-3 rounded-lg">
                            <ShareIcon />
                        </div>
                        <div className="hover:bg-secondary-light w-fit h-fit p-3 rounded-lg">
                            <CopyIcon />
                        </div>
                        <div className="hover:bg-secondary-light w-fit h-fit p-3 rounded-lg">
                            <ReloadIcon />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <LoadingButton loading={loading} onClick={onRunCode} />
                    </div>
                </div>
            </div>
        </div>
    );
};
