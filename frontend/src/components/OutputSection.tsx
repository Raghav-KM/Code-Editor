import { Console } from "./Console";

export const OutputSection = () => {
    return (
        <div className="w-full h-full border-4 border-black p-2 flex flex-col gap-2">
            <div className="w-full h-16 border border-black"></div>
            <div className="w-full flex-grow border ">
                <Console />
            </div>
        </div>
    );
};
