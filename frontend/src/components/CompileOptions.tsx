export const CompileOptions = () => {
    return (
        <div className="w-full h-full border border-black p-2">
            <div className="w-full h-fit p-4 flex flex-col gap-2 border border-black">
                <div className="text-xl font-mono font-semibold">
                    Print Options
                </div>
                <div className="flex items-baseline font-mono">
                    <input type="checkbox" />
                    <span className="ms-2">Tokenized Code</span>
                </div>
                <div className="flex items-baseline font-mono">
                    <input type="checkbox" />
                    <span className="ms-2">Parse Tree</span>
                </div>
                <div className="flex items-baseline font-mono">
                    <input type="checkbox" />
                    <span className="ms-2">Intermediate Code</span>
                </div>
                <div className="flex items-baseline font-mono">
                    <input type="checkbox" />
                    <span className="ms-2">ASM Code</span>
                </div>
            </div>
        </div>
    );
};
