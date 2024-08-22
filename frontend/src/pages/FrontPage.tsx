import { BACKEND_URL, CodeSection } from "../components/CodeSection";
import { OutputSection } from "../components/OutputSection";
import { Sidebar } from "../components/Sidebar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CollapseSidebarAtom, UserAtom } from "../store/atoms/atoms";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const FrontPage = () => {
    const isSidebarCollapsed = useRecoilValue(CollapseSidebarAtom);

    const setUser = useSetRecoilState(UserAtom);
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
            })
            .catch(() => {
                localStorage.removeItem("jwt-token");
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
