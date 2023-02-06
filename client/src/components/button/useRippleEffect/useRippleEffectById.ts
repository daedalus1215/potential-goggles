import { useEffect } from 'react';
import './ripple-style.css';

//@TODO: This does not have the complete effect I am looking for.
//@TODO: When we scroll and click on a button in the content that is being scrolled...
//@TODO: There is an issue where the ripple effect is in the location where the element
//@TODO: Originally existed at. Haven't been able to find an easy solution. Will have to circle back.
const useRippleEffectById = (id, onClick) => {
    const BUTTON_DELAY_FOR_MATERIAL_EFFECT = 250;

    const createRipple = event => {
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
        if (id) {
            const element = document.getElementById(id);
            element.addEventListener("click", createRipple);

            return () => {
                element.removeEventListener("click", createRipple);
            };
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return event => {
        setTimeout(() => onClick(event), BUTTON_DELAY_FOR_MATERIAL_EFFECT);
    }
};

export default useRippleEffectById;