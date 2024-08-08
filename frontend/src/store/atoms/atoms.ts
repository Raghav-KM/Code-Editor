import { atom } from "recoil";

export type fileType = {
    id: number;
    fileName: string;
    saved: boolean;
    code: string;
};

export const filesAtom = atom<fileType[]>({
    key: "filesAtom",
    default: [
        {
            id: 1,
            fileName: "codeA.js",
            saved: true,
            code: "Code in file 1",
        },
        {
            id: 2,
            fileName: "codeB.js",
            saved: true,
            code: "Code in file 2",
        },
    ],
});

export const selectedFileIdAtom = atom({
    key: "selectedFileId",
    default: -1,
});

export const fileChangedAtom = atom({
    key: "fileChangedAtom",
    default: false,
});

export const codeResponseAtom = atom({
    key: "codeResponseAtom",
    default: "",
});

export const awaitingCodeResponseAtom = atom({
    key: "awaitingCodeResponseAtom",
    default: false,
});
