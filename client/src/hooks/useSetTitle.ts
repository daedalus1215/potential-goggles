import { useEffect } from "react";

const useSetTitle = (title: string) => {
    useEffect(() => {
        window.document.title = title;
    }, [title]);
};

export default useSetTitle;