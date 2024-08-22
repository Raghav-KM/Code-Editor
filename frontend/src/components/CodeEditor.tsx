import { useRecoilState, useRecoilValue } from "recoil";
import {
    ClearCodeAtom,
    FilesAtom,
    FileType,
    SelectedFileIdAtom,
    UserLoggedInAtom,
} from "../store/atoms/atoms";
import { ChangeEvent, useEffect, useRef } from "react";

export const highlightSyntax = (code: string): string => {
    const keywords = [
        "let",
        "dbg",
        "function",
        "for",
        "else",
        "int",
        "char",
        "if",
        "call",
        "endl",
    ];
    const operators = ["+", "-", "*", "/", "=", "!", "<", ">"];

    const regex = new RegExp(
        `\\b(${keywords.join("|")})\\b|[${operators
            .map((op) => "\\" + op)
            .join("")}]|\\b\\d+\\b`,
        "g"
    );

    code = code.replace(regex, (matched) => {
        if (keywords.includes(matched)) {
            if (["int", "char", "endl"].includes(matched)) {
                return `<span style="color:#4daed3;">${matched}</span>`;
            } else {
                return `<span style="color:#cb5567;">${matched}</span>`;
            }
        } else if (operators.includes(matched)) {
            return `<span style="color:#cb5567;">${matched}</span>`;
        } else {
            return `<span style="color:#4daed3;">${matched}</span>`;
        }
    });
    return code + "</br></br>";
};

export const CodeEditor = () => {
    const editorDivRef = useRef(null);
    const editorRef = useRef(null);
    const lineCounterRef = useRef(null);
    const debounceTimer = useRef<number | null>(null);

    const selectedFileId = useRecoilValue(SelectedFileIdAtom);
    const [files, setFiles] = useRecoilState(FilesAtom);

    const clearCode = useRecoilValue(ClearCodeAtom);
    const loggedIn = useRecoilValue(UserLoggedInAtom);

    useEffect(() => {
        const selectedFile = files.find(
            (file: FileType) => file.id == selectedFileId
        );
        if (selectedFile) {
            updateEditor(selectedFile.code);
            updateEditorDiv(selectedFile.code);
        } else {
            updateEditor("");
            updateEditorDiv("");
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

    useEffect(() => {
        const selectedFile = files.find(
            (file: FileType) => file.id == selectedFileId
        );
        if (selectedFile) {
            updateEditor(selectedFile.code);
            updateEditorDiv(selectedFile.code);
        } else {
            updateEditor("");
            updateEditorDiv("");
        }
    }, [clearCode]);

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateEditorDiv(e.target.value);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(updateFile, 500, {
            id: selectedFileId,
            code: e.target.value,
        });
    };

    const updateFile = ({ id, code }: { id: string; code: string }) => {
        const selectedFile = files.find((file: FileType) => file.id == id);
        if (!selectedFile) return;

        setFiles((files: FileType[]) => {
            const updatedFiles = files.map((file: FileType) =>
                file.id == selectedFile.id
                    ? {
                          ...file,
                          code: code,
                          saved: !file.saved ? false : file.code == code,
                      }
                    : file
            );
            if (loggedIn) {
                localStorage.setItem("files", JSON.stringify(updatedFiles));
            }
            return updatedFiles;
        });
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
            element.innerHTML += "</br></br>";
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
            <div className="w-full h-full p-2">
                <div className="w-full h-full flex flex-row">
                    <div
                        className="w-[2%] pt-3 font-mono leading-7 text-sm font-semibold text-white opacity-80 whitespace-break-spaces text-end overflow-hidden"
                        ref={lineCounterRef}
                    ></div>
                    <div className="w-[98%] ps-2 ">
                        <div className="w-full h-full relative">
                            <div
                                className="w-full h-full text-white font-semibold font-mono p-3 whitespace-pre leading-7 text-md overflow-hidden "
                                ref={editorDivRef}
                            ></div>
                            <div className="w-full h-full absolute inset-0">
                                <textarea
                                    className="w-full h-full text-transparent whitespace-nowrap font-semibold font-mono p-3 caret-white leading-7 text-md outline-none bg-transparent overflow-auto scrollbar scrollbar-thumb-gray-300 scrollbar-track-transparent resize-none"
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
