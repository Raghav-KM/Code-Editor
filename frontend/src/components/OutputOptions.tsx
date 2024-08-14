import { useRecoilState } from "recoil";
import { OutputOptionSelectionAtom } from "../store/atoms/atoms";
import { ConsoleIcon } from "../assets/icons/ConsoleIcon";
import { HelpIcon } from "../assets/icons/HelpIcon";

export const OutputOptions = () => {
    const [optionSelection, setOptionSelection] = useRecoilState(
        OutputOptionSelectionAtom
    );
    return (
        <div className="w-full h-full flex flex-row justify-around items-center">
            <button
                className={`w-56 p-4 h-fit rounded-xl flex justify-center items-center font-mono font-semibold cursor-pointer text-white ${
                    optionSelection == 1
                        ? "bg-secondary-light"
                        : "hover:bg-secondary-light"
                }`}
                onClick={() => {
                    setOptionSelection(1);
                }}
            >
                <HelpIcon className={"size-6 me-2"} />
                Compile Options
            </button>

            <button
                className={`w-56 p-4 h-fit rounded-xl flex justify-center items-center cursor-pointer font-mono font-semibold text-white ${
                    optionSelection == 2
                        ? "bg-secondary-light"
                        : "hover:bg-secondary-light"
                }`}
                onClick={() => {
                    setOptionSelection(2);
                }}
            >
                <ConsoleIcon className={"size-6 me-2"} />
                Console
            </button>
        </div>
    );
};
