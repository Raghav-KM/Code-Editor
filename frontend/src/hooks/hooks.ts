import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { fileChangedAtom, filesAtom, fileType } from "../store/atoms/atoms";

export const useUpdateSelectedFile = ({
    id,
    code,
}: {
    id: number;
    code: string;
}) => {
    const [files, setFiles] = useRecoilState(filesAtom);
    const [fileChanged, setFileChanged] = useRecoilState(fileChangedAtom);
    const isInit = useIsMount();

    useEffect(() => {
        if (isInit) return;
        if (!fileChanged) {
            setFiles(
                files.map((file: fileType) => {
                    if (file.id == id) {
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
        } else {
            setFileChanged(false);
        }
    }, [code]);
};

export const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
        isMountRef.current = false;
    }, []);
    return isMountRef.current;
};
