import { BACKEND_URL, CodeSection } from "../components/CodeSection";
import { OutputSection } from "../components/OutputSection";
import { Sidebar } from "../components/Sidebar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    CollapseSidebarAtom,
    FilesAtom,
    FileType,
    UserAtom,
} from "../store/atoms/atoms";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserLoggedInAtom } from "../store/atoms/atoms";

export const FrontPage = () => {
    const isSidebarCollapsed = useRecoilValue(CollapseSidebarAtom);
    const setLoggedIn = useSetRecoilState(UserLoggedInAtom);

    const setUser = useSetRecoilState(UserAtom);
    const setFiles = useSetRecoilState(FilesAtom);

    useEffect(() => {
        const token = localStorage.getItem("jwt-token") || "";
        axios
            .get(`${BACKEND_URL}/api/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                const decodedToken: {
                    userName: string;
                    userId: string;
                    fullName: string;
                } = jwtDecode(token);

                setUser({
                    userName: decodedToken.userName,
                    userId: decodedToken.userId,
                    fullName: decodedToken.fullName,
                    token: token,
                });
                setLoggedIn(true);

                axios
                    .get(`${BACKEND_URL}/api/store/files`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        const uploadedFiles = response.data.files;
                        try {
                            const saved_files = JSON.parse(
                                localStorage.getItem("files") || ""
                            );
                            setFiles(saved_files);
                        } catch (ex) {
                            console.log(uploadedFiles);
                            setFiles(
                                uploadedFiles.map((file: FileType) => {
                                    return { ...file, saved: true };
                                })
                            );
                        }
                    });
            })
            .catch(() => {
                localStorage.removeItem("jwt-token");
                setLoggedIn(false);
            });
    }, []);

    return (
        <>
            <div className="w-full h-lvh flex">
                <div
                    className={`max-h-[100vh] px-2 transition-all ease-out duration-300 bg-primary ${
                        isSidebarCollapsed ? "w-[4vw]" : "w-[20vw]"
                    }`}
                >
                    <Sidebar />
                </div>
                <div className="flex-grow max-w-[96vw] h-lvh flex overflow-hidden">
                    <div className="w-4/6 max-w-[4/6] h-full">
                        <CodeSection />
                    </div>
                    <div className="w-2/6 max-w-[2/6] h-full">
                        <OutputSection />
                    </div>
                </div>
            </div>
        </>
    );
};
