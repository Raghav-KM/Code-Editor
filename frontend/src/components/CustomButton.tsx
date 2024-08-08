import { ReactElement } from "react";

export const CustomButton = ({
    label,
    selected,
    children,
}: {
    label: string;
    selected: boolean;
    children: ReactElement;
}) => {
    return (
        <button
            className={`py-4  w-40 flex justify-center gap-2 items-center rounded-xl ${
                selected ? "bg-secondary-light" : ""
            } hover:bg-secondary-light`}
        >
            {children}
            <div className="text-white font-semibold">{label}</div>
        </button>
    );
};
