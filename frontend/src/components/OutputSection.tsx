import { useRecoilValue } from "recoil";
import { Console } from "./Console";
import { ExecutionStatus } from "./ExecutionStatus";
import { OutputOptions } from "./OutputOptions";
import { OutputOptionSelectionAtom } from "../store/atoms/atoms";
import { CompileOptions } from "./CompileOptions";

export const OutputSection = () => {
    const optionSelection = useRecoilValue(OutputOptionSelectionAtom);
    return (
        <div className="w-full h-full border-4 border-black p-2 flex flex-col gap-2">
            <div className="w-full min-h-16 border border-black">
                <OutputOptions />
            </div>
            <div className="w-full flex-grow h-[81.5vh] max-h-[81.5vh] border ">
                {optionSelection == 1 ? <CompileOptions /> : <Console />}
            </div>
            <div className="w-full min-h-16">
                <ExecutionStatus />
            </div>
        </div>
    );
};
