import { useEffect } from 'react';

/**
 * Use this hook to update the current time for Timer.js
 * @param {Number} time 
 * @param {Boolean} isActive 
 * @param {Function} setTime 
 */
type useUpdateCurrentTimeT = (time:number, isActive: boolean, setTime: (time:number) => void) => void;

const useUpdateCurrentTime:useUpdateCurrentTimeT = (time, isActive, setTime) => {
    return useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;

        if (isActive) {
            let timeOffset = Date.now() - time;
            interval = setInterval(() => setTime(Date.now() - timeOffset), 25);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval)
    }, [isActive, time, setTime]);
};

export default useUpdateCurrentTime;