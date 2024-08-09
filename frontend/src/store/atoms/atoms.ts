import { atom } from "recoil";

export type FileType = {
    id: string;
    fileName: string;
    saved: boolean;
    code: string;
};

export const FilesAtom = atom<FileType[]>({
    key: "FilesAtom",
    default: [],
});

export const SelectedFileIdAtom = atom<string>({
    key: "SelectedFileAtom",
    default: "",
});
