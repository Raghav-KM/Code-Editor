import { useRecoilState } from "recoil";
import { CodeIcon } from "../assets/icons/CodeIcon";
import { CrossIcon } from "../assets/icons/CrossIcon";
import { selectedFileIdAtom } from "../store/atoms/atoms";

export const OpenedFiles = ({
    id,
    fileName,
    saved,
}: {
    id: string;
    fileName: string;
    saved: boolean;
}) => {
    const [selectedFileId, setSelectedFileId] =
        useRecoilState(selectedFileIdAtom);

    return (
        <div
            className={`h-full px-6  border-b-4 ${
                selectedFileId == id
                    ? "border-accent-primary"
                    : "border-secondary-light"
            } hover:bg-secondary-light`}
            onClick={() => {
                setSelectedFileId(id);
            }}
        >
            <div className="h-full w-36 flex flex-row items-center">
                <div className=" w-5/6 flex justify-start items-basline gap-2">
                    <CodeIcon />
                    <div
                        className={`text-white text-md font-mono ${
                            selectedFileId == id ? "font-bold" : "font-medium"
                        }`}
                    >
                        {`${fileName}${!saved ? "*" : ""}`}
                    </div>
                </div>
                <div className="w-1/6 flex justify-center hover:bg-primary rounded-lg py-1">
                    <CrossIcon />
                </div>
            </div>
        </div>
    );
};
