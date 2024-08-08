import { CopyIcon } from "../assets/icons/CopyIcon";
import { ReloadIcon } from "../assets/icons/ReloadIcon";
import { ShareIcon } from "../assets/icons/ShareIcon";
import { OpenedFiles } from "../components/OpenedFiles";
import { CodeEditor } from "./CodeEditor";
import { useRecoilValue } from "recoil";
import { filesAtom, fileType } from "../store/atoms/atoms";

export const CodeSection = () => {
    const files = useRecoilValue<fileType[]>(filesAtom);
    
    return (
        <div className="w-full h-full bg-secondary-light flex flex-col p-1">
            <div className="w-full h-[7vh] px-0.5 cursor-pointer">
                <div className="w-full h-full bg-primary flex flex-row">
                    {files.map((file: fileType) => (
                        <OpenedFiles
                            id={file.id}
                            fileName={file.fileName}
                            saved={file.saved}
                            key={file.id}
                        />
                    ))}
                    <div className="h-full flex-grow border-b-4 border-secondary-light"></div>
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
                    <div>
                        <button className="px-6 py-3 h-fit bg-accent-primary rounded-xl  text-white flex flex-row gap-2 items-center">
                            <div className="text-md font-semibold font-mono">
                                Run
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
