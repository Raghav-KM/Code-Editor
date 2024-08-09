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
        <div className="w-full h-full border border-black py-5 px-3">
            {loading ? (
                <ConsoleLoading />
            ) : (
                <div>
                    <div className="text-md font-mono font-bold">
                        {codeResponse}
                    </div>
                    <div className="text-md font-mono font-bold text-red-500">
                        {codeResponse}
                    </div>
                </div>
            )}
        </div>
    );
};
