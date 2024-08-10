import { Console } from "./Console";
import { ExecutionStatus } from "./ExecutionStatus";

export const OutputSection = () => {
    return (
        <div className="w-full h-full border-4 border-black p-2 flex flex-col gap-2">
            <div className="w-full min-h-16 border border-black"></div>
            <div className="w-full flex-grow h-[81.5vh] max-h-[81.5vh] border ">
                <Console />
            </div>
            <div className="w-full min-h-16">
                <ExecutionStatus />
            </div>
        </div>
    );
};
