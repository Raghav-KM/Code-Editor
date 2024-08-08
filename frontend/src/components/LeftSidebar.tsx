import { useState } from "react";
import { BarsIcon } from "../assets/icons/BarsIcon";
import { CodeSnippet } from "./CodeSnippet";
import { ChevronLeftIcons } from "../assets/icons/ChevronLeftIcon";

export const LeftSidebar = () => {
    const [collapse, setCollapse] = useState(true);

    const onCollapse = () => {
        setCollapse(!collapse);
    };

    return !collapse ? (
        <div className="w-80 h-full bg-primary p-2">
            <div className="w-full h-16 flex flex-row justify-end items-center p-2 ">
                <div
                    className="w-16 h-16 text-xl rounded-lg  hover:bg-secondary-light cursor-pointer text-white flex justify-center items-center"
                    onClick={onCollapse}
                >
                    <ChevronLeftIcons />
                </div>
            </div>
            <div className="w-full flex justify-center mt-10">
                <div className=" w-5/6 flex flex-col gap-8">
                    <CodeSnippet
                        code={`let i : int = 0 ;\nlet j : char = 'c' ;`}
                    />
                    <CodeSnippet code={`dbg i;\ndbg 1 + 2 * 3 / 4;\n`} />
                    <CodeSnippet code={`i = ( j * 1 + 2 ) / 3;`} />
                    <CodeSnippet
                        code={`if ( condition ) {\n\t....\n} else {\n\t....\n}`}
                    />
                    <CodeSnippet code={`function funcA () {\n\t...\n}`} />
                    <CodeSnippet code={`call funcA ();`} />
                </div>
            </div>
        </div>
    ) : (
        <div className="w-20 h-full bg-primary p-2">
            <div
                className={`w-full h-16 text-xl font-bold flex justify-center items-center text-white cursor-pointer hover:bg-secondary-light rounded-md`}
                onClick={onCollapse}
                title="Code Snippets"
            >
                <BarsIcon />
            </div>
        </div>
    );
};
