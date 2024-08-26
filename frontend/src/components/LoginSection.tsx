import { useState } from "react";
import { ChevronDownIcon } from "../assets/icons/ChevronDownIcon";
import { ChevronUpIcon } from "../assets/icons/ChevronUpIcon";
import { LoaderButton } from "./LoaderButton";
import axios from "axios";
import { BACKEND_URL } from "./CodeSection";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    FilesAtom,
    FileType,
    UserAtom,
    UserLoggedInAtom,
} from "../store/atoms/atoms";
import { jwtDecode } from "jwt-decode";

export const LoginSection = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useRecoilState(UserAtom);
    const setLoggedIn = useSetRecoilState(UserLoggedInAtom);

    const setFiles = useSetRecoilState(FilesAtom);

    const [credentials, setCredentials] = useState<{
        userName: string;
        password: string;
    }>({
        userName: "",
        password: "",
    });

    const onLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/user/signin`,
                {
                    ...credentials,
                }
            );
            const decodedToken: {
                userName: string;
                userId: string;
                fullName: string;
            } = jwtDecode(response.data.token);

            setUser({
                userName: decodedToken.userName,
                userId: decodedToken.userId,
                fullName: decodedToken.fullName,
                token: response.data.token,
            });
            setLoggedIn(true);

            const token = response.data.token;
            localStorage.setItem("jwt-token", response.data.token);

            axios
                .get(`${BACKEND_URL}/api/store/files`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const uploadedFiles = response.data.files;

                    setFiles((files: FileType[]) => {
                        /*
                        let updatedfiles = files;
                        console.log(uploadedFiles);

                        updatedfiles = updatedfiles.concat(
                            uploadedFiles
                                .filter((file: FileType) => {
                                    if (
                                        updatedfiles.find(
                                            (f: FileType) => f.id == file.id
                                        )
                                    ) {
                                        return false;
                                    } else {
                                        return true;
                                    }
                                })
                                .map((file: FileType) => {
                                    return { ...file, saved: true };
                                })
                        );
                        console.log(updatedfiles);
                        return updatedfiles;
                        */
                        console.log(files);
                        return uploadedFiles;
                    });
                });
            console.log(user);
            alert("Login Successfull");
        } catch (ex) {
            console.log(ex);
            alert("Login Failed!!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" w-full h-full flex flex-col gap-3">
            <div
                className="w-full min-w-[20vh] flex flex-row justify-between items-center overflow-x-clip text-white font-mono font-bold text-lg p-4 px-6 bg-secondary-light rounded-lg cursor-pointer hover:opacity-85"
                onClick={() => {
                    setCollapsed((c) => !c);
                }}
            >
                Login
                {collapsed ? (
                    <ChevronDownIcon className="size-7 text-white " />
                ) : (
                    <ChevronUpIcon className="size-7 text-white " />
                )}
            </div>
            {collapsed ? (
                ""
            ) : (
                <div className="w-full flex-grow flex max-h-[60vh] flex-col gap-4 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-secondary-light scrollbar-track-transparent px-4">
                    <div className="flex flex-row gap-2 items-center justify-around">
                        <div className="min-w-20 text-white font-semibold text-md ">
                            UserName
                        </div>
                        <input
                            type="text"
                            className="p-2 bg-secondary-light text-white font-mono font-semibold outline-none"
                            onChange={(e) => {
                                setCredentials({
                                    ...credentials,
                                    userName: e.target.value,
                                });
                            }}
                        ></input>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-around">
                        <div className="min-w-20 text-white font-semibold text-md ">
                            Password
                        </div>
                        <input
                            type="password"
                            className="p-2 bg-secondary-light text-white font-mono font-semibold outline-none"
                            onChange={(e) => {
                                setCredentials({
                                    ...credentials,
                                    password: e.target.value,
                                });
                            }}
                        ></input>
                    </div>
                    <div className="w-full flex">
                        <LoaderButton
                            onClick={onLogin}
                            loading={loading}
                            label={"Login"}
                            width={"w-full"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
