import { useRecoilState } from "recoil";
import { BarsIcon } from "../assets/icons/BarsIcon";
import { CollapseSidebarAtom } from "../store/atoms/atoms";
import { ChevronLeftIcons } from "../assets/icons/ChevronLeftIcon";
import { CodeSnippets } from "./CodeSnippets";

export const Sidebar = () => {
    const [isSidebarCollapsed, setCollapseSidebar] =
        useRecoilState(CollapseSidebarAtom);

    return (
        <div className="bg-white w-full h-full border-[3px] border-black flex flex-col justify-between gap-2 pt-2">
            <div
                className={`w-full h-16 flex items-center justify-end p-2`}
                onClick={() => {
                    setCollapseSidebar((s) => !s);
                }}
            >
                {isSidebarCollapsed ? (
                    <BarsIcon
                        className={
                            "size-10 hover:bg-gray-100 hover:cursor-pointer p-1 rounded-lg"
                        }
                    />
                ) : (
                    <ChevronLeftIcons
                        className={
                            "size-10 hover:bg-gray-100 hover:cursor-pointer p-1 rounded-lg "
                        }
                    />
                )}
            </div>
            {isSidebarCollapsed ? (
                ""
            ) : (
                <div className=" w-full flex-grow max-h-[96vh] flex flex-col gap-3 overflow-auto scrollbar scrollbar-thumb-gray-300 scrollbar-track-transparent p-2">
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
