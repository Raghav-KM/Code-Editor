import { GridLoader } from "react-spinners";

export const ConsoleLoading = () => {
    return (
        <div className="grid h-full w-full animate-pulse place-items-center opacity-50 ">
            <div>
                <GridLoader color="black" size={8} speedMultiplier={0.7} />
            </div>
        </div>
    );
};
