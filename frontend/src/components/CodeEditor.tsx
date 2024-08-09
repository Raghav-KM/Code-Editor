import { useRecoilState, useRecoilValue } from "recoil";
import { FilesAtom, FileType, SelectedFileIdAtom } from "../store/atoms/atoms";
import { ChangeEvent, useEffect, useRef } from "react";

export const CodeEditor = () => {
    const editorDivRef = useRef(null);
    const editorRef = useRef(null);
    const lineCounterRef = useRef(null);
    const debounceTimer = useRef<number | null>(null);

    const selectedFileId = useRecoilValue(SelectedFileIdAtom);
    const [files, setFiles] = useRecoilState(FilesAtom);

    useEffect(() => {
        const selectedFile = files.find(
            (file: FileType) => file.id == selectedFileId
        );
        if (selectedFile) {
            updateEditor(selectedFile.code);
            updateEditorDiv(selectedFile.code);
        }
        return () => {
            if (selectedFile) {
                if (!editorRef.current) return;
                const editor = editorRef.current as HTMLTextAreaElement;

                if (debounceTimer.current) {
                    clearTimeout(debounceTimer.current);
                }

                updateFile({
                    id: selectedFile.id,
                    code: editor.value,
                });
            }
        };
    }, [selectedFileId]);

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateEditorDiv(e.target.value);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(updateFile, 2000, {
            id: selectedFileId,
            code: e.target.value,
        });
    };

    const updateFile = ({ id, code }: { id: string; code: string }) => {
        const selectedFile = files.find((file: FileType) => file.id == id);
        if (!selectedFile) return;
        setFiles((files: FileType[]) =>
            files.map((file: FileType) =>
                file.id == selectedFile.id
                    ? {
                          ...file,
                          code: code,
                          saved: !file.saved ? false : file.code == code,
                      }
                    : file
            )
        );
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();

            const textarea = e.target as HTMLTextAreaElement;
            const [start, end] = [
                textarea.selectionStart,
                textarea.selectionEnd,
            ];

            textarea.value =
                textarea.value.substring(0, start) +
                "\t" +
                textarea.value.substring(end);

            updateEditorDiv(textarea.value);

            requestAnimationFrame(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 1;
            });
        }
    };

    const highlightSyntax = (code: string) => {
        return `<span style="color:red;">${code}</span></br></br>`;
    };

    const handelSyncScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
        const editor = e.target as HTMLTextAreaElement;

        if (editorDivRef.current) {
            const element = editorDivRef.current as HTMLDivElement;
            element.scrollTo({
                behavior: "auto",
                top: editor.scrollTop,
                left: editor.scrollLeft,
            });
        }

        if (lineCounterRef.current) {
            const element = lineCounterRef.current as HTMLTextAreaElement;
            element.scrollTo({
                behavior: "auto",
                top: editor.scrollTop,
                left: editor.scrollLeft,
            });
        }
    };

    const updateEditor = (code: string) => {
        if (editorRef.current) {
            const editor = editorRef.current as HTMLTextAreaElement;
            editor.value = code;
        }
    };
    const updateEditorDiv = (code: string) => {
        if (editorDivRef.current) {
            const editorDiv = editorDivRef.current as HTMLDivElement;
            editorDiv.innerHTML = highlightSyntax(code);
            updateLineCounter(code);
        }
    };
    const updateLineCounter = (code: string) => {
        if (lineCounterRef.current) {
            const lineCounter = lineCounterRef.current as HTMLDivElement;
            lineCounter.innerHTML =
                Array.from(
                    { length: code.split("\n").length },
                    (_, i) => i + 1
                ).join("\n") + "</br></br>";
        }
    };

    return (
        <>
            <div className="w-full h-full pt-2">
                <div className="w-full h-full flex flex-row">
                    <div
                        className="w-[24px] max-h-[320px] pt-3 font-mono leading-7 text-sm font-semibold text-black opacity-50 whitespace-break-spaces text-end overflow-hidden"
                        ref={lineCounterRef}
                    ></div>
                    <div className="w-[96%] max-h-[320px] h-full ps-2 ">
                        <div className="w-full h-full relative">
                            <div
                                className="w-full h-full text-black font-semibold font-mono p-3 whitespace-pre leading-7 overflow-hidden text-lg"
                                ref={editorDivRef}
                            ></div>
                            <div className="w-full h-full absolute inset-0 ">
                                <textarea
                                    className="w-full h-full text-transparent font-semibold font-mono p-3 caret-black leading-7 text-md outline-none bg-transparent text-lg resize-none scrollbar scrollbar-thumb-gray-300 scrollbar-track-transparent"
                                    onChange={handleOnChange}
                                    onKeyDown={handleOnKeyDown}
                                    onScroll={handelSyncScroll}
                                    ref={editorRef}
                                    spellCheck={false}
                                    disabled={selectedFileId == ""}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
