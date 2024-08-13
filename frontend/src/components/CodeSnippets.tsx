import { highlightSyntax } from "./CodeEditor";

export const CodeSnippets = ({ code }: { code: string }) => {
    return (
        <div
            className="border border-black w-full h-fit p-2 px-4 whitespace-pre font-mono font-semibold text-md leading-7"
            dangerouslySetInnerHTML={{
                __html: highlightSyntax(code).slice(0, -5),
            }}
        />
    );
};
