export const CodeSnippet = ({ code }: { code: string }) => {
    return (
        <div className="w-full h-full whitespace-pre bg-secondary-light text-white p-4 font-mono font-semibold text-md rounded-lg cursor-pointer">
            {code}
        </div>
    );
};
