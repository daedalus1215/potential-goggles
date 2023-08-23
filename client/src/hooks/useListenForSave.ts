import useEventListener from "./useEventListener";

const useListenForSave = (formName:string) => {
    let isControlPressed = false;
    useEventListener('keydown', ({ key }: any) => {
        if (key === 'Control') {
            isControlPressed = true;
        } else {
            if (isControlPressed && key === 's') {
                document.getElementById(formName)
                    ?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
            }
            isControlPressed = false;
        }

    });
};

export default useListenForSave;