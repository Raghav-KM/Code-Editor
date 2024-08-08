import { ConsoleIcon } from "../assets/icons/ConsoleIcon";
import { HelpIcon } from "../assets/icons/HelpIcon";
import { Console } from "./Console";
import { CustomButton } from "./CustomButton";

export const OutputSection = () => {
    return (
        <div className="w-full h-full bg-primary p-2 pb-0 flex flex-col">
            <div className="h-[7vh]">
                <div className="h-full flex flex-row justify-around items-center">
                    <div>
                        <CustomButton label="Instructions" selected={false}>
                            <HelpIcon />
                        </CustomButton>
                    </div>
                    <div>
                        <CustomButton label="Console" selected={true}>
                            <ConsoleIcon />
                        </CustomButton>
                    </div>
                </div>
            </div>
            <div className="w-full flex-grow px-2 py-4">
                <Console />
            </div>
        </div>
    );
};
