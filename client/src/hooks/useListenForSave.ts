import useEventListener from "./useEventListener";

const useListenForSave = (formName:string) => {
    let isControlPressed = false;
    window.console.log("useListenForSave")
    useEventListener('keydown', ({ key }: any) => {
        if (key === 'Control') {
            window.console.log('control')
            isControlPressed = true;
        } else {
            if (isControlPressed && key === 's') {
                window.console.log('oh yeah')
                document.getElementById(formName)
                    ?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
            }
            isControlPressed = false;
        }

    });
};

export default useListenForSave;