import { useRecoilValue } from "recoil";
import { Console } from "./Console";
import { ExecutionStatus } from "./ExecutionStatus";
import { OutputOptions } from "./OutputOptions";
import { OutputOptionSelectionAtom } from "../store/atoms/atoms";
import { CompileOptions } from "./CompileOptions";

export const OutputSection = () => {
    const optionSelection = useRecoilValue(OutputOptionSelectionAtom);
    return (
        <div className="w-full h-full bg-primary px-2 flex flex-col">
            <div className="w-full min-h-[7vh]">
                <OutputOptions />
            </div>
            <div className="w-full flex-grow h-[85vh] max-h-[85vh] px-2">
                {optionSelection == 1 ? <CompileOptions /> : <Console />}
            </div>
            <div className="w-full min-h-[8vh]">
                <ExecutionStatus />
            </div>
        </div>
    );
};
