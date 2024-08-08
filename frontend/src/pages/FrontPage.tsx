import { CodeSection } from "../components/CodeSection";

export const FrontPage = () => {
    return (
        <>
            <div className="w-full h-lvh flex">
                <div className="h-lvh w-fit">{/* <LeftSidebar /> */}</div>

                <div className="flex-grow h-lvh flex">
                    <div className="w-full h-lvh">
                        <CodeSection />
                    </div>
                    <div className="h-lvh bg-white">
                        {/* <OutputSection /> */}
                    </div>
                </div>
            </div>
        </>
    );
};
