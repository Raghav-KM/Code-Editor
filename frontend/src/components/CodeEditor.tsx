import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    fileChangedAtom,
    filesAtom,
    fileType,
    selectedFileIdAtom,
} from "../store/atoms/atoms";
import { useIsMount, useUpdateSelectedFile } from "../hooks/hooks";

export const CodeEditor = () => {
    const editorDivRef = useRef(null);
    const editorRef = useRef(null);
    const lineCounterRef = useRef(null);

    const files = useRecoilValue(filesAtom);
    const selectedFileId = useRecoilValue(selectedFileIdAtom);

    const [code, setCode] = useState("");
    const setFileChanged = useSetRecoilState(fileChangedAtom);

    const isInit = useIsMount();
    useEffect(() => {
        if (isInit) return;

        setFileChanged(true);
        const selectedFile = files.find(
            (file: fileType) => file.id == selectedFileId
        );

        if (editorDivRef.current) {
            const editorDiv = editorDivRef.current as HTMLDivElement;
            editorDiv.innerHTML = highlightSyntax(selectedFile?.code || "");
        }

        if (editorRef.current) {
            const editor = editorRef.current as HTMLTextAreaElement;
            editor.value = selectedFile?.code || "";
        }
        setCode(selectedFile?.code || "");
    }, [selectedFileId]);

    useUpdateSelectedFile({
        id: selectedFileId,
        code: code,
    });

    const handleTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

            if (editorDivRef.current) {
                const editorDiv = editorDivRef.current as HTMLDivElement;
                editorDiv.innerHTML =
                    highlightSyntax(textarea.value) + "</br></br>";
            }

            requestAnimationFrame(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 1;
            });
        }
    };

    const handleSyncScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
        const scrollableElement = e.target as HTMLTextAreaElement;

        if (editorDivRef.current) {
            const element = editorDivRef.current as HTMLDivElement;

            element.innerHTML += "<br/><br/>";
            element.scrollTo({
                behavior: "auto",
                top: scrollableElement.scrollTop,
                left: scrollableElement.scrollLeft,
            });
        }
        if (lineCounterRef.current) {
            const element = lineCounterRef.current as HTMLTextAreaElement;

            element.innerHTML += "<br/><br/>";
            element.scrollTo({
                behavior: "auto",
                top: scrollableElement.scrollTop,
                left: scrollableElement.scrollLeft,
            });
        }
    };

    const highlightSyntax = (text: string) => {
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
        ];
        const operators = ["+", "-", "*", "/", "=", "!", "<", ">"];

        const regex = new RegExp(
            `\\b(${keywords.join("|")})\\b|[${operators
                .map((op) => "\\" + op)
                .join("")}]|\\b\\d+\\b`,
            "g"
        );

        text = text.replace(regex, (matched) => {
            if (keywords.includes(matched)) {
                if (["int", "char"].includes(matched)) {
                    return `<span style="color:#e0cd93;">${matched}</span>`;
                } else {
                    return `<span style="color:#cb5567;">${matched}</span>`;
                }
            } else if (operators.includes(matched)) {
                return `<span style="color:#cb5567;">${matched}</span>`;
            } else {
                return `<span style="color:#4daed3;">${matched}</span>`;
            }
        });
        return text;
    };

    return (
        <div className="w-full h-full pt-2">
            <div className="w-full h-full flex flex-row">
                <div
                    className="w-[24px] h-full pt-3 font-mono leading-7 text-sm font-semibold text-white opacity-50 whitespace-break-spaces text-end overflow-hidden "
                    ref={lineCounterRef}
                >
                    {Array.from(
                        { length: code.split("\n").length },
                        (_, i) => i + 1
                    ).join("\n")}
                </div>
                <div className="w-[96%] h-full ps-2">
                    <div className="w-full h-full relative">
                        <div
                            className="w-full h-full bg-secondary text-white font-semibold font-mono p-3 whitespace-pre leading-7 overflow-hidden"
                            ref={editorDivRef}
                        ></div>
                        <div className="w-full h-full absolute inset-0 ">
                            <textarea
                                className="w-full h-full p-3 font-semibold outline-none text-transparent bg-transparent caret-white font-mono leading-7 overflow-auto scrollbar scrollbar-track-transparent scrollbar-thumb-secondary-light resize-none whitespace-nowrap"
                                onKeyDown={handleTab}
                                spellCheck={false}
                                disabled={selectedFileId == -1}
                                onChange={(
                                    e: React.ChangeEvent<HTMLTextAreaElement>
                                ) => {
                                    setCode(e.target.value);
                                    if (editorDivRef.current) {
                                        const editorDiv =
                                            editorDivRef.current as HTMLDivElement;
                                        editorDiv.innerHTML =
                                            highlightSyntax(e.target.value) +
                                            "<br></br>";
                                    }
                                }}
                                ref={editorRef}
                                onScroll={handleSyncScroll}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
