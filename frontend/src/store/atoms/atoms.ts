import { atom, selector } from "recoil";

export type FileType = {
    id: string;
    fileName: string;
    saved: boolean;
    code: string;
};

export type CodeResponseType = {
    file_id: string;
    code_id: string;
    status: string;
    compiler: {
        error?: string;
        stderr: string;
        stdout: string;
    };
    executable: {
        error?: string;
        stderr: string;
        stdout: string;
    };
};

export const testFile: FileType = {
    id: "xxxx-xxxx-xxxx-xxxx",
    code: `function print_alpha(){
    for(let i:int = 0;i<26;i=i+1){
        let c:char = 'a'+i;
        dbg c;
        dbg ' ';
    }
}
let N:int = 10;
for(let i:int=0;i<N;i=i+1){
    dbg i;
    dbg ':';
    dbg ' ';
    call print_alpha();
    if(i!=N-1){
        dbg endl;
    }
}`,
    saved: false,
    fileName: "TestFile.dc",
};

export const FilesAtom = atom<FileType[]>({
    key: "FilesAtom",
    default: [testFile],
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
        file_id: "",
        code_id: "",
        status: "",
        compiler: {
            error: "",
            stderr: "",
            stdout: "",
        },
        executable: {
            error: "",
            stderr: "",
            stdout: "",
        },
    },
});

export const CollapseSidebarAtom = atom({
    key: "CollapseSidebarAtom",
    default: true,
});

export const OutputOptionSelectionAtom = atom({
    key: "OutputOptionSelectionAtom",
    default: 2,
});

export const ClearCodeAtom = atom({
    key: "ClearCodeAtom",
    default: 1,
});

export const UserAtom = atom({
    key: "userAtom",
    default: {
        userName: "",
        userId: "",
        fullName: "",
        token: "",
    },
});

export const UserLoggedInAtom = atom({
    key: "UserLoggedInAtom",
    default: false,
});

export const FilesUploadedSelector = selector({
    key: "FilesUploadedAtom",
    get: ({ get }) => {
        const files = get(FilesAtom);
        let all_saved = true;
        files.forEach((file: FileType) => {
            if (!file.saved) {
                all_saved = false;
            }
        });
        return all_saved;
    },
});
