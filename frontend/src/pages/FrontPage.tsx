import { CodeSection } from "../components/CodeSection";

export const FrontPage = () => {
    return (
        <>
            <div className="w-full h-lvh flex">
                <div className="h-lvh w-20 bg-black">
                    
                </div>

                <div className="flex-grow h-lvh flex">
                    <div className="w-4/6 h-full p-2">
                        <CodeSection />
                    </div>
                    <div className="w-2/6 h-full bg-black"></div>
                </div>
            </div>
        </>
    );
};
