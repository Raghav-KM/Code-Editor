import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BarsIcon } from "../assets/icons/BarsIcon";
import {
    CollapseSidebarAtom,
    FilesAtom,
    FilesUploadedSelector,
    FileType,
    UserLoggedInAtom,
} from "../store/atoms/atoms";
import { ChevronLeftIcons } from "../assets/icons/ChevronLeftIcon";
import { SnippetsSection } from "./SnippetsSection";
import { LoginSection } from "./LoginSection";
import { ProfileSection } from "./ProfileSection";
import { Upload } from "../assets/icons/Upload";
import { useState } from "react";
import { TickIcon } from "../assets/icons/TickIcon";
import { CircularLoader } from "../assets/icons/CircularLoader";

export const Sidebar = () => {
    const [isSidebarCollapsed, setCollapseSidebar] =
        useRecoilState(CollapseSidebarAtom);

    const setFiles = useSetRecoilState(FilesAtom);

    const loggedIn = useRecoilValue(UserLoggedInAtom);
    const fileUploaded = useRecoilValue(FilesUploadedSelector);
    const [uploading, setUploading] = useState(false);

    const uploadFiles = () => {
        setUploading(true);

        setTimeout(() => {
            setFiles((files: FileType[]) =>
                files.map((file: FileType) => {
                    return {
                        ...file,
                        saved: true,
                    };
                })
            );
            setUploading(false);
        }, 1500);
    };

    return (
        <div className="bg-primary w-full h-full flex flex-col justify-between gap-2 pt-2">
            <div className={`w-full h-fit flex items-center justify-end p-2`}>
                {isSidebarCollapsed ? (
                    <div className="flex flex-col">
                        <div className="w-fit h-fit">
                            <BarsIcon
                                className={
                                    "size-10 hover:bg-secondary-light hover:cursor-pointer p-2 rounded-lg text-white mb-8"
                                }
                                onClick={() => {
                                    setCollapseSidebar((s) => !s);
                                }}
                            />
                        </div>
                        {loggedIn ? (
                            <div>
                                {!fileUploaded ? (
                                    uploading ? (
                                        <CircularLoader className="text-white size-10 p-2" />
                                    ) : (
                                        <Upload
                                            className={
                                                "size-10 hover:bg-secondary-light hover:cursor-pointer p-2 rounded-lg text-white"
                                            }
                                            onClick={uploadFiles}
                                        />
                                    )
                                ) : (
                                    <TickIcon
                                        className={
                                            "size-10 hover:bg-secondary-light hover:cursor-pointer p-2 rounded-lg text-white"
                                        }
                                    />
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            setCollapseSidebar((s) => !s);
                        }}
                    >
                        <ChevronLeftIcons
                            className={
                                "size-10 hover:bg-secondary-light hover:cursor-pointer p-2 rounded-lg text-white"
                            }
                        />
                    </div>
                )}
            </div>
            {isSidebarCollapsed ? (
                ""
            ) : (
                <div className="w-full flex-grow flex flex-col gap-4 overflow-y-auto scrollbar scrollbar-thumb-secondary-light scrollbar-track-transparent">
                    <div className="px-4 p-2">
                        {loggedIn ? <ProfileSection /> : <LoginSection />}
                    </div>
                    <div className="px-4 p-2">
                        <SnippetsSection />
                    </div>
                </div>
            )}
        </div>
    );
};
