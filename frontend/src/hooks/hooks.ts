import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { filesAtom, fileType, selectedFileIdAtom } from "../store/atoms/atoms";

export const useUpdateSelectedFile = ({ code }: { code: string }) => {
    const [files, setFiles] = useRecoilState(filesAtom);
    const selectedFileId = useRecoilValue(selectedFileIdAtom);

    useEffect(() => {
        console.log("Timer Started");
        const updateFile = setTimeout(() => {
            if (selectedFileId == "-1") return;
            console.log("File Saved!!" + code);
            
            setFiles(
                files.map((file: fileType) => {
                    if (file.id == selectedFileId) {
                        return {
                            ...file,
                            code: code,
                            saved: false,
                        };
                    } else {
                        return file;
                    }
                })
            );
        }, 5000);

        return () => {
            if (updateFile) {
                console.log("Timer Cleared");
                clearTimeout(updateFile);
            }
        };
    }, [selectedFileId]);
};
