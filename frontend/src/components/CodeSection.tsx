import { CodeEditor } from "./CodeEditor";
import { OpenedFiles } from "./OpenedFiles";

export const CodeSection = () => {
    return (
        <div className="w-full h-full border-4 border-black p-2 flex flex-col gap-2">
            <div className="w-full h-16 border border-black">
                <OpenedFiles  />
            </div>
            <div className="w-full flex-grow border border-black">
                <CodeEditor />
            </div>
        </div>
    );
};
