import React, { useState } from 'react';


interface props {
    children: any;
}
export const ExpandedContextProvider: React.FC<props> = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true);

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