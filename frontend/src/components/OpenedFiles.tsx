import { useRecoilState, useSetRecoilState } from "recoil";
import { CrossIcon } from "../assets/icons/CrossIcon";
import { DocumentIcon } from "../assets/icons/DocumentIcon";
import { PlusIcon } from "../assets/icons/PlusIcon";
import { FilesAtom, FileType, SelectedFileIdAtom } from "../store/atoms/atoms";
import { v4 as uuid } from "uuid";
import React, { useRef, useState } from "react";

export const OpenedFiles = () => {
    const [files, setFiles] = useRecoilState(FilesAtom);

    const onAddFile = () => {
        setFiles([
            ...files,
            {
                id: uuid(),
                fileName: "untitiled",
                saved: false,
                code: "",
            },
        ]);
    };

    return (
        <div className="w-full h-full border border-black flex flex-row justify-between">
            <div className="flex-grow h-full flex flex-row overflow-x-auto scrollbar-none">
                {files.map((file: FileType) => {
                    return (
                        <OpenedFile
                            id={file.id}
                            fileName={file.fileName}
                            key={file.id}
                        />
                    );
                })}
            </div>

            <div
                className="w-16 h-full border-s border-black flex justify-center items-center hover:bg-gray-100 cursor-pointer"
                onClick={onAddFile}
            >
                <PlusIcon className="size-6" />
            </div>
        </div>
    );
};

const OpenedFile = ({ id, fileName }: { id: string; fileName: string }) => {
    const setFiles = useSetRecoilState(FilesAtom);
    const [selectedFileId, setSelectedFileId] =
        useRecoilState(SelectedFileIdAtom);

    const onRemoveFile = () => {
        setFiles((files: FileType[]) =>
            files.filter((file: FileType) => file.id != id)
        );
    };
    const handleOnKeyDown = (e: React.KeyboardEvent) => {
        if (e.key == "Enter") {
            if (inputFileNameRef.current) {
                const input = inputFileNameRef.current as HTMLInputElement;

                setFiles((files: FileType[]) =>
                    files.map((file: FileType) =>
                        file.id == id
                            ? {
                                  ...file,
                                  fileName: input.value,
                              }
                            : file
                    )
                );
            }
            setEditable(false);
        } else if (e.key == "Escape") {
            setEditable(false);
        }
    };

    const handleOnBlur = () => {
        setEditable(false);
    };

    const handlOnDoubleClick = () => {
        setEditable(true);
    };

    const [editable, setEditable] = useState(false);
    const inputFileNameRef = useRef(null);

    return (
        <div
            className={`w-48 max-w-48 h-full border-r  border-black flex p-1 hover:bg-gray-50 cursor-pointer ${
                selectedFileId == id ? "bg-gray-100" : ""
            }`}
        >
            <div className="w-5/6 h-full flex justify-center items-center">
                <div
                    className="flex items-center justify-center gap-2"
                    onClick={() => {
                        setSelectedFileId(id);
                    }}
                >
                    <DocumentIcon className="size-5 mb-1" />
                    {editable ? (
                        <div className="border w-4/5  px-1 ">
                            <input
                                type="text"
                                className="w-full p-0.5 outline-none font-mono text-md font-medium"
                                ref={inputFileNameRef}
                                onKeyDown={handleOnKeyDown}
                                onBlur={handleOnBlur}
                            ></input>
                        </div>
                    ) : (
                        <span
                            className="font-mono text-md font-medium"
                            onDoubleClick={handlOnDoubleClick}
                        >
                            {fileName}
                        </span>
                    )}
                </div>
            </div>
            <div className="w-1/6 flex items-center">
                <div
                    className="hover:bg-gray-100 rounded-lg p-1"
                    onClick={onRemoveFile}
                >
                    <CrossIcon className="size-5" />
                </div>
            </div>
        </div>
    );
};
