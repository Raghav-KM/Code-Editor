import { atom } from "recoil";

export type fileType = {
    id: string;
    fileName: string;
    saved: boolean;
    code: string;
};

export const filesAtom = atom<fileType[]>({
    key: "filesAtom",
    default: [
        {
            id: "1",
            fileName: "codeA.js",
            saved: false,
            code: "Code in file 1",
        },
        {
            id: "2",
            fileName: "codeB.js",
            saved: true,
            code: "Code in file 2",
        },
        {
            id: "3",
            fileName: "codeC.js",
            saved: false,
            code: "Code in file 3",
        },
        {
            id: "4",
            fileName: "codeD.js",
            saved: true,
            code: "Code in file 4",
        },
    ],
});

export const selectedFileIdAtom = atom({
    key: "selectedFileId",
    default: "-1",
});
