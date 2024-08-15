import { useState } from "react";
import { CodeSnippets } from "./CodeSnippets";
import { ChevronUpIcon } from "../assets/icons/ChevronUpIcon";
import { ChevronDownIcon } from "../assets/icons/ChevronDownIcon";

export const SnippetsSection = () => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <div className=" w-full h-full flex flex-col gap-3">
            <div
                className="w-full min-w-[20vh] flex flex-row justify-between items-center overflow-x-clip text-white font-mono font-bold text-xl p-4 px-6 bg-secondary-light rounded-lg cursor-pointer hover:opacity-85"
                onClick={() => {
                    setCollapsed((c) => !c);
                }}
            >
                Code Snippets
                {collapsed ? (
                    <ChevronDownIcon className="size-7 text-white " />
                ) : (
                    <ChevronUpIcon className="size-7 text-white " />
                )}
            </div>
            {collapsed ? (
                ""
            ) : (
                <div className="w-full flex-grow flex max-h-[60vh] flex-col gap-3 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-secondary-light scrollbar-track-transparent px-2">
                    <CodeSnippets code={`let i:int = 10;\nlet j:char = 'a';`} />
                    <CodeSnippets
                        code={`dbg i;\ndbg 1;\ndbg 'a';\ndbg i+1*2`}
                    />
                    <CodeSnippets code={`i = j;\ni = j+(1*2-3);`} />
                    <CodeSnippets
                        code={`if (condition) {\n\t.\n\t.\n} else {\n\t.\n\t.\n}`}
                    />
                    <CodeSnippets
                        code={`for(let i:int=0; i<N; i=i+1){\n\t.\n\t.\n}`}
                    />

                    <CodeSnippets
                        code={`function function_name(){\n\t.\n\t.\n}`}
                    />
                    <CodeSnippets code={`call function_name();`} />
                </div>
            )}
        </div>
    );
};
