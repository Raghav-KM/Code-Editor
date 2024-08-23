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
                className={`min-w-52 w-[45%] p-3 h-fit rounded-xl flex justify-center items-center font-mono font-semibold cursor-pointer text-white ${
                    optionSelection == 1
                        ? "bg-secondary-light"
                        : "hover:bg-secondary-light"
                } text-sm`}
                onClick={() => {
                    setOptionSelection(1);
                }}
            >
                <HelpIcon className={"min-w-[24px] size-6 me-2"} />
                Compile Options
            </button>

            <button
                className={`min-w-52 w-[45%] p-3 h-fit rounded-xl flex justify-center items-center cursor-pointer font-mono font-semibold text-white ${
                    optionSelection == 2
                        ? "bg-secondary-light"
                        : "hover:bg-secondary-light"
                } text-sm`}
                onClick={() => {
                    setOptionSelection(2);
                }}
            >
                <ConsoleIcon className={"min-w-[24px] size-6 me-2"} />
                Console
            </button>
        </div>
    );
};
