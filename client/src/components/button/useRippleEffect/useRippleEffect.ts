import { BaseSyntheticEvent, useEffect } from 'react';

import './ripple-style.css';

type EventExtend = BaseSyntheticEvent & Touch & Event;

const useRippleEffect = (tagName: string, onClick: (event: EventExtend) => void) => {
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

    return (event: EventExtend) => {
        setTimeout(() => onClick(event), BUTTON_DELAY_FOR_MATERIAL_EFFECT);
    }
};

export default useRippleEffect;