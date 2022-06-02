import {createContext, useState} from 'react'

export const IsDesktopScreenContext = createContext();

const IsDesktopContextProvider = (props) => {
    const mediaQuery = window.matchMedia('(min-width: 600px)');
    const [isDesktopScreen, setIsDesktopScreen] = useState(mediaQuery.matches);
    mediaQuery.onchange = (e) => {
        if(e.matches){
            setIsDesktopScreen(true);
        }else{
            setIsDesktopScreen(false);
        }
    }

    return(
        <IsDesktopScreenContext.Provider value={{isDesktopScreen, setIsDesktopScreen}}>
            {props.children}
        </IsDesktopScreenContext.Provider>
    )
}

export default IsDesktopContextProvider