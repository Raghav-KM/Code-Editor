import { useRecoilValue } from "recoil";
import {
    AwaitingCodeResponseAtom,
    CodeResponseAtom,
} from "../store/atoms/atoms";
import { ConsoleLoading } from "./ConsoleLoading";

export const Console = () => {
    const loading = useRecoilValue(AwaitingCodeResponseAtom);
    const codeResponse = useRecoilValue(CodeResponseAtom);

    return (
        <div className="w-full h-full border border-black pt-5 pb-1 px-3 flex flex-col">
            {loading ? (
                <ConsoleLoading />
            ) : (
                <>
                    <div className="w-full flex-grow">
                        <div className="h-fit text-md font-mono font-bold pb-2">
                            {codeResponse.stdout}
                        </div>
                        <div className="h-fit text-md font-mono font-bold text-red-500">
                            {codeResponse.stderr}
                        </div>
                    </div>
                    <div className="w-full h-16 p-2 font-mono font-semibold">
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
                </>
            )}
        </div>
    );
};
