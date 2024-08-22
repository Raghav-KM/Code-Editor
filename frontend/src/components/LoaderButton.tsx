import { MouseEventHandler } from "react";
import { CircularLoader } from "../assets/icons/CircularLoader";

export const LoaderButton = ({
    onClick,
    loading,
    label,
    width,
}: {
    onClick: MouseEventHandler;
    loading: boolean;
    label: string;
    width?: string;
}) => {
    return (
        <button
            className={`${
                width ? width : "w-20"
            } h-12 px-4 py-1 text-white font-semibold bg-accent-primary font-mono rounded-lg hover:opacity-85 flex justify-center items-center`}
            onClick={onClick}
            disabled={loading}
        >
            {!loading ? `${label}` : <CircularLoader className={"py-1"} />}
        </button>
    );
};
