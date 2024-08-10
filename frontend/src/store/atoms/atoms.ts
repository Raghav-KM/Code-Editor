import { atom } from "recoil";

export type FileType = {
    id: string;
    fileName: string;
    saved: boolean;
    code: string;
};

export type CodeResponseType = {
    response_id: string;
    file_id: string;
    status: "Success" | "Error" | "";
    error: string;
    stderr: string;
    stdout: string;
};

export const FilesAtom = atom<FileType[]>({
    key: "FilesAtom",
    default: [
        {
            id: "xxxx-xxxx-xxxx-xxxx",
            code: `for(let i:int=0;i<N;i=i+1){
	dbg i;
	dbg ':';
	for(let j:int = 0;j<N;j=j+1){
		dbg j;
	}
	dbg endl;
}`,
            saved: true,
            fileName: "TestFile.js",
        },
    ],
});

export const SelectedFileIdAtom = atom<string>({
    key: "SelectedFileAtom",
    default: "",
});

export const AwaitingCodeResponseAtom = atom<boolean>({
    key: "AwaitingCodeResponseAtom",
    default: false,
});

export const CodeResponseAtom = atom<CodeResponseType>({
    key: "CodeResponseAtom",
    default: {
        response_id: "",
        file_id: "",
        status: "",
        error: "",
        stderr: "",
        stdout: "",
    },
});
