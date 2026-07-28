import { createContext, useContext, useState, useEffect } from "react";
import Auth_API from "../api/routes/authRoutes";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const checkUser = async () => {
        try {
            const response = await Auth_API.getCurrentUser();
            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    const logOut = async () => {
        console.log("function callled!");
        try {
            await Auth_API.logoutUser();
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <AuthContext.Provider value={{ user, loading, setLoading, logOut, checkUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);