import { CodeSection } from "../components/CodeSection";
import { LeftSidebar } from "../components/LeftSidebar";
import { OutputSection } from "../components/OutputSection";

export const FrontPage = () => {
    return (
        <>
            <div className="w-full h-lvh flex">
                <div className="h-lvh w-fit">
                    <LeftSidebar />
                </div>

                <div className="flex-grow h-lvh flex">
                    <div className="w-4/6 h-full">
                        <CodeSection />
                    </div>
                    <div className="w-2/6 h-fullbg-white">
                        <OutputSection />
                    </div>
                </div>
            </div>
        </>
    );
};
