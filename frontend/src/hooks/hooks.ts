import { useEffect, useRef } from "react";

export const useIsInit = () => {
    const isInitRef = useRef(true);
    useEffect(() => {
        isInitRef.current = false;
    }, []);
    return isInitRef.current;
};
