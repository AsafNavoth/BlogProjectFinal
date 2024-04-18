import {createContext, useCallback, useEffect, useState} from "react";

export const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

        const handleCredentialResponse = useCallback((response) => {

        })
    // Set user credentials using localStorage in case of refresh/close

    useEffect(() => {
        const theUser = localStorage.getItem("user");

        if (theUser && !theUser.includes("undefined")) {
            setUser(JSON.parse(theUser));
        }
    }, []);

    const signOut = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    const value = {user, signOut}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}