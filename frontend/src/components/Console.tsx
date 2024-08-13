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
        <div className="w-full h-full border border-black pt-5 pb-1 px-3 flex flex-col overflow-auto scrollbar scrollbar-thumb-gray-300 scrollbar-track-transparent ">
            {loading ? (
                <ConsoleLoading />
            ) : (
                <>
                    <div className="w-full flex-grow">
                        <div className="h-fit text-md font-mono font-bold pb-2 whitespace-pre">
                            {codeResponse.status == "Success"
                                ? codeResponse.executable.stdout
                                : ""}
                        </div>
                        <div className="h-fit text-md font-mono font-bold text-red-500 whitespace-pre">
                            {codeResponse.status == "Compiler-Error"
                                ? codeResponse.compiler.stderr
                                : codeResponse.executable.stderr}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
