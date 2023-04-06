import {createContext, useState} from "react";

export const ModalContext = createContext(null);

export const ModalProvider = ({children}) => {
    const [modalType, setModalType] = useState("");
    const [client, setClient] = useState({});
    const [theme, setTheme] = useState("default");
    const [visibility, setVisibility] = useState(false);

    const showModal = (client = {}, theme = "default", modalType = "client") => {
        if (modalType === "newLoan") {
            setModalType("newLoan");
        } else if (modalType === "oldLoan") {
            setModalType("oldLoan");
        }

        setClient(client);
        setTheme(theme);
        setVisibility(true);
    }

    const hiddeModal = () => {
        setClient({});
        setTheme("default");
        setModalType("client");
        setVisibility(false);
    }

    return (
        <ModalContext.Provider value={{modalType, client, theme, visibility, showModal, hiddeModal}}>
            {children}
        </ModalContext.Provider>
    );
};