import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CrossIcon } from "../assets/icons/CrossIcon";
import { DocumentIcon } from "../assets/icons/DocumentIcon";
import { PlusIcon } from "../assets/icons/PlusIcon";
import {
    FilesAtom,
    FileType,
    SelectedFileIdAtom,
    UserLoggedInAtom,
} from "../store/atoms/atoms";
import { v4 as uuid } from "uuid";
import React, { useRef, useState } from "react";

export const OpenedFiles = () => {
    const [files, setFiles] = useRecoilState(FilesAtom);

    const onAddFile = () => {
        const id = uuid();
        setFiles([
            ...files,
            {
                id: id,
                fileName: "untitiled.dc",
                saved: false,
                code: ``,
            },
        ]);
    };

    return (
        <div className="w-full h-full  flex flex-row justify-between">
            <div className=" flex-grow h-full flex flex-row overflow-x-auto scrollbar-none">
                {files.map((file: FileType) => {
                    return (
                        <OpenedFile
                            id={file.id}
                            fileName={file.fileName}
                            saved={file.saved}
                            key={file.id}
                        />
                    );
                })}
                <div className="flex-grow h-full border-b-4 border-secondary-light"></div>
            </div>
            <div
                className="min-w-16 h-full border-s-4 border-b-4 border-secondary-light flex justify-center items-center hover:bg-secondary-light cursor-pointer"
                onClick={onAddFile}
            >
                <PlusIcon className="size-6 text-white" />
            </div>
        </div>
    );
};

const OpenedFile = ({
    id,
    fileName,
    saved,
}: {
    id: string;
    fileName: string;
    saved: boolean;
}) => {
    const loggedIn = useRecoilValue(UserLoggedInAtom);
    const setFiles = useSetRecoilState(FilesAtom);

    const [selectedFileId, setSelectedFileId] =
        useRecoilState(SelectedFileIdAtom);

    const onRemoveFile = () => {
        if (selectedFileId == id) {
            setSelectedFileId("");
        }
        setFiles((files: FileType[]) =>
            files.filter((file: FileType) => file.id != id)
        );
    };
    const handleOnKeyDown = (e: React.KeyboardEvent) => {
        if (e.key == "Enter") {
            if (inputFileNameRef.current) {
                const input = inputFileNameRef.current as HTMLInputElement;

                setFiles((files: FileType[]) => {
                    const updatedFiles = files.map((file: FileType) =>
                        file.id == id
                            ? {
                                  ...file,
                                  fileName:
                                      input.value == ""
                                          ? "untitiled.dc"
                                          : input.value,
                                  saved: false,
                              }
                            : file
                    );
                    if (loggedIn) {
                        localStorage.setItem(
                            "files",
                            JSON.stringify(updatedFiles)
                        );
                    }
                    return updatedFiles;
                });
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
        if (inputFileNameRef.current) {
            const input = inputFileNameRef.current as HTMLInputElement;
            input.value = fileName;
            setTimeout(() => {
                input.focus();
            }, 0);
        }
    };

    const [editable, setEditable] = useState(false);
    const inputFileNameRef = useRef(null);

    return (
        <div
            className={`w-56 max-w-56 min-w-56 h-full border-b-4 flex p-1 hover:bg-secondary-light cursor-pointer ${
                selectedFileId == id
                    ? "border-accent-primary"
                    : "border-secondary-light"
            }`}
        >
            <div
                className="w-5/6 h-full flex justify-center items-center"
                onClick={() => {
                    setSelectedFileId(id);
                }}
            >
                <div className="flex items-center justify-center gap-2">
                    <DocumentIcon className="size-5 mb-1 text-white" />

                    <div
                        className={`border w-4/5  px-1 ${
                            !editable ? "hidden" : ""
                        }`}
                    >
                        <input
                            type="text"
                            className="w-full p-0.5 outline-none font-mono text-md font-medium bg-secondary-light text-white"
                            ref={inputFileNameRef}
                            onKeyDown={handleOnKeyDown}
                            onBlur={handleOnBlur}
                            spellCheck={false}
                        ></input>
                    </div>

                    <span
                        className={`font-mono text-md font-semibold text-white ${
                            editable ? "hidden" : ""
                        }`}
                        onDoubleClick={handlOnDoubleClick}
                    >
                        {`${fileName}${saved ? "" : "*"}`}
                    </span>
                </div>
            </div>
            <div className="w-1/6 flex items-center">
                <div
                    className="hover:bg-secondary rounded-lg p-1"
                    onClick={onRemoveFile}
                >
                    <CrossIcon className="size-5 text-white" />
                </div>
            </div>
        </div>
    );
};
