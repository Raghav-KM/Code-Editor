import { CodeSection } from "../components/CodeSection";
import { OutputSection } from "../components/OutputSection";
import { Sidebar } from "../components/Sidebar";
import { useRecoilValue } from "recoil";
import { CollapseSidebarAtom } from "../store/atoms/atoms";

export const FrontPage = () => {
    const isSidebarCollapsed = useRecoilValue(CollapseSidebarAtom);
    return (
        <>
            <div className="w-full h-lvh flex">
                <div
                    className={`max-h-[100vh] px-2 transition-all ease-out duration-300 bg-primary ${
                        isSidebarCollapsed ? "w-[4vw]" : "w-[20vw]"
                    }`}
                >
                    <Sidebar />
                </div>
                <div className="flex-grow max-w-[96vw] h-lvh flex overflow-hidden">
                    <div className="w-4/6 max-w-[4/6] h-full">
                        <CodeSection />
                    </div>
                    <div className="w-2/6 max-w-[2/6] h-full">
                        <OutputSection />
                    </div>
                </div>
            </div>
        </>
    );
};
