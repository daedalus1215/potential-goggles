import { MouseEvent, MouseEventHandler, useEffect } from 'react';

type EventExtend = MouseEventHandler<HTMLButtonElement> & Touch & { currentTarget: any };

type useRippleEffectType = (tagName: string, onClick: (e: any) => void) => MouseEventHandler<HTMLButtonElement>;
const useRippleEffect: useRippleEffectType = (tagName: string, onClick) => {
    const BUTTON_DELAY_FOR_MATERIAL_EFFECT = 250;

    const createRipple: any = (event: EventExtend) => {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
        circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    };

    useEffect(() => {
        const tagNames = document.getElementsByTagName(tagName) as HTMLCollectionOf<Element>;
        for (const t of tagNames) {
            t.addEventListener("click", createRipple);
        }

        return () => {
            for (const t of tagNames) {
                t.removeEventListener("click", createRipple);
            }
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return (e: MouseEvent) => {
        setTimeout(() => onClick(e), BUTTON_DELAY_FOR_MATERIAL_EFFECT);
    }
};

export default useRippleEffect;