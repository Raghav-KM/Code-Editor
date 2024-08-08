import { useRecoilValue } from "recoil";
import {
    awaitingCodeResponseAtom,
    codeResponseAtom,
} from "../store/atoms/atoms";
import { ConsoleLoading } from "./ConsoleLoading";

export const Console = () => {
    const codeResponse = useRecoilValue(codeResponseAtom);
    const awaitingCodeResponse = useRecoilValue(awaitingCodeResponseAtom);

    return (
        <div className="w-full h-full bg-primary text-white font-mono font-semibold  border-secondary-light p-4 ">
            {awaitingCodeResponse ? (
                <div className="w-full h-full">
                    <ConsoleLoading />
                </div>
            ) : (
                <div>
                    {" "}
                    {codeResponse}
                    <br /> <div className="text-red-500">{codeResponse}</div>
                </div>
            )}
        </div>
    );
};
