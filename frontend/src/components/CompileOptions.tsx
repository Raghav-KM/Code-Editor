export const CompileOptions = () => {
    return (
        <div className="w-full h-full  p-2">
            <div className="w-full h-fit p-4 flex flex-col gap-2">
                <div className="text-xl font-mono font-semibold text-white">
                    Print Options
                </div>
                <Option label={"Tokenized Code"} />
                <Option label={"Parse Tree"} />
                <Option label={"Intermediate Code"} />
                <Option label={"ASM Code"} />
            </div>
        </div>
    );
};

const Option = ({ label }: { label: string }) => {
    return (
        <div className="flex items-baseline font-mono text-white">
            <input type="checkbox" className=" size-3.5" />
            <span className="ms-2">{label}</span>
        </div>
    );
};
