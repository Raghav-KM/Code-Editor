import { Bounce, toast } from "react-toastify";

export const myToast = ({
    type,
    label,
}: {
    type: "error" | "success";
    label: string;
}) => {
    if (type == "error") return errorToast({ label: label });
    if (type == "success") return successToast({ label: label });
};

const errorToast = ({ label }: { label: string }) => {
    return toast.error(label, {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: true,
        theme: "dark",
        transition: Bounce,
        className: "p-4 shadow-lg font-bold",
    });
};

const successToast = ({ label }: { label: string }) => {
    return toast.success(label, {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: true,
        theme: "dark",
        transition: Bounce,
        className: "p-4 shadow-lg font-bold",
        progressClassName: "bg-green",
    });
};
