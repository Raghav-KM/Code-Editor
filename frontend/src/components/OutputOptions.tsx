import { useRecoilState } from "recoil";
import { OutputOptionSelectionAtom } from "../store/atoms/atoms";

export const OutputOptions = () => {
    const [optionSelection, setOptionSelection] = useRecoilState(
        OutputOptionSelectionAtom
    );
    return (
        <div className="w-full h-full flex flex-row">
            <div
                className={`w-1/2 h-full border-r border-black flex justify-center items-center font-mono font-medium cursor-pointer ${
                    optionSelection == 1 ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
                onClick={() => {
                    setOptionSelection(1);
                }}
            >
                Compile Options
            </div>
            <div
                className={`w-1/2 h-full flex justify-center items-center cursor-pointer font-mono font-medium ${
                    optionSelection == 2 ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
                onClick={() => {
                    setOptionSelection(2);
                }}
            >
                Console
            </div>
        </div>
    );
};
