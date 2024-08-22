import { useState } from "react";
import { ChevronDownIcon } from "../assets/icons/ChevronDownIcon";
import { ChevronUpIcon } from "../assets/icons/ChevronUpIcon";
import { LoaderButton } from "./LoaderButton";
import { useRecoilState } from "recoil";
import { UserAtom } from "../store/atoms/atoms";

export const ProfileSection = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useRecoilState(UserAtom);

    const onLogout = () => {
        setLoading(true);

        setTimeout(() => {
            alert("Logout Successfull");
            setLoading(false);
            setUser({
                userId: "",
                userName: "",
                fullName: "",
                token: "",
            });
            localStorage.removeItem("jwt-token");
        }, 1000);
    };

    return (
        <div className=" w-full h-full flex flex-col gap-3">
            <div
                className="w-full min-w-[20vh] flex flex-row justify-between items-center overflow-x-clip text-white font-mono font-bold text-xl p-4 px-6 bg-secondary-light rounded-lg cursor-pointer hover:opacity-85"
                onClick={() => {
                    setCollapsed((c) => !c);
                }}
            >
                Profile
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
                            value={user.userName}
                            disabled={true}
                        ></input>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-around">
                        <div className="min-w-20 text-white font-semibold text-md ">
                            Full Name
                        </div>
                        <input
                            type="text"
                            className="p-2 bg-secondary-light text-white font-mono font-semibold outline-none"
                            value={user.fullName}
                            disabled={true}
                        ></input>
                    </div>
                    <div className="w-full flex">
                        <LoaderButton
                            onClick={onLogout}
                            loading={loading}
                            label={"Logout"}
                            width={"w-full"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
