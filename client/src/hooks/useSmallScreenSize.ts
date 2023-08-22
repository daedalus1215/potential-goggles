import { useRef } from "react";

export const useSmallScreenSize = () => {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    return windowSize.current[0] < 500;
};

export default useSmallScreenSize;