import {createContext, useState} from 'react'

interface IsDesktopScreenContextInterface {
    isDesktopScreen: boolean,
    setIsDesktopScreen:  React.Dispatch<React.SetStateAction<boolean>>| null
}
interface Props {
    children: React.ReactNode
}

export const IsDesktopScreenContext = createContext<IsDesktopScreenContextInterface>({
    isDesktopScreen: false,
    setIsDesktopScreen: null
});

const IsDesktopContextProvider = (props: Props) => {
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