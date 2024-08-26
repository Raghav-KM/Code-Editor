import { highlightSyntax } from "./CodeEditor";

export const CodeSnippets = ({ code }: { code: string }) => {
    return (
        <div
            className="bg-secondary-light text-white w-full h-fit p-4 whitespace-pre font-mono font-semibold text-md leading-7 rounded-lg"
            dangerouslySetInnerHTML={{
                __html: highlightSyntax(code).slice(0, -5),
            }}
        />
    );
};
