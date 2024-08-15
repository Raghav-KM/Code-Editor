import { useRecoilState } from "recoil";
import { BarsIcon } from "../assets/icons/BarsIcon";
import { CollapseSidebarAtom } from "../store/atoms/atoms";
import { ChevronLeftIcons } from "../assets/icons/ChevronLeftIcon";
import { SnippetsSection } from "./SnippetsSection";
import { LoginSection } from "./LoginSection";

export const Sidebar = () => {
    const [isSidebarCollapsed, setCollapseSidebar] =
        useRecoilState(CollapseSidebarAtom);

    return (
        <div className="bg-primary w-full h-full flex flex-col justify-between gap-2 pt-2">
            <div
                className={`w-full h-16 flex items-center justify-end p-2`}
                onClick={() => {
                    setCollapseSidebar((s) => !s);
                }}
            >
                {isSidebarCollapsed ? (
                    <BarsIcon
                        className={
                            "size-10 hover:bg-secondary-light hover:cursor-pointer p-2 me-2 rounded-lg text-white"
                        }
                    />
                ) : (
                    <ChevronLeftIcons
                        className={
                            "size-10 hover:bg-secondary-light hover:cursor-pointer p-2 rounded-lg text-white"
                        }
                    />
                )}
            </div>
            {isSidebarCollapsed ? (
                ""
            ) : (
                <div className="w-full flex-grow flex flex-col gap-4 overflow-y-auto scrollbar scrollbar-thumb-secondary-light scrollbar-track-transparent">
                    <div className="px-4 p-2">
                        <LoginSection />
                    </div>
                    <div className="px-4 p-2">
                        <SnippetsSection />
                    </div>
                </div>
            )}
        </div>
    );
};
