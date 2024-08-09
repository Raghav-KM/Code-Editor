import { CodeSection } from "../components/CodeSection";
import { OutputSection } from "../components/OutputSection";

export const FrontPage = () => {
    return (
        <>
            <div className="w-full h-lvh flex">
                <div className="h-lvh w-20 bg-black"></div>

                <div className="flex-grow h-lvh flex">
                    <div className="w-4/6 h-full p-2">
                        <CodeSection />
                    </div>
                    <div className="w-2/6 h-full p-2">
                        <OutputSection />
                    </div>
                </div>
            </div>
        </>
    );
};
