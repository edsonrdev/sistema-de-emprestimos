import {createContext, useState} from "react";

export const ModalContext = createContext(null);

export const ModalProvider = ({children}) => {
    const [client, setClient] = useState({});
    const [theme, setTheme] = useState("default");
    const [visibility, setVisibility] = useState(false);

    const showModal = (client = {}, theme = "default") => {
        setClient(client);
        setTheme(theme);
        setVisibility(true);
    }

    const hiddeModal = () => {
        setClient({});
        setTheme("default");
        setVisibility(false);
    }

    return (
        <ModalContext.Provider value={{client, theme, visibility, setClient, setTheme, setVisibility, showModal, hiddeModal}}>
            {children}
        </ModalContext.Provider>
    );
};