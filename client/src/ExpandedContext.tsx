import React, { useState } from 'react';
import { useSmallScreenSize } from './hooks';


interface props {
    children: any;
}
export const ExpandedContextProvider: React.FC<props> = ({ children }) => {
    const isSmallScreen = useSmallScreenSize();
    const [isExpanded, setIsExpanded] = useState(!isSmallScreen);

    return (
        <ExpandedContext.Provider value={{
            isExpanded: isExpanded,
            setIsExpanded: setIsExpanded
        }}>
            {children}
        </ExpandedContext.Provider>
    );
}
export const ExpandedContext = React.createContext({isExpanded:false, setIsExpanded: (v:boolean) => {}});