import { useRecoilValue } from "recoil";
import { CodeResponseAtom } from "../store/atoms/atoms";

export const ExecutionStatus = () => {
    const codeResponse = useRecoilValue(CodeResponseAtom);

    return (
        <div className="w-full h-full p-4 font-mono font-semibold text-white">
            <div className="w-full flex flex-row">
                <div className="w-24">{`File Id :`}</div>
                <div
                    className={`${
                        codeResponse.status == "Success"
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {codeResponse.file_id}
                </div>
            </div>
            <div className="w-full flex flex-row">
                <div className="w-24 whitespace-pre">{`Status  :`}</div>
                <div
                    className={`${
                        codeResponse.status == "Success"
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {codeResponse.status}
                </div>
            </div>
        </div>
    );
};
