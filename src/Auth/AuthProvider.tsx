import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext<{token:string|null,setToken:SetTokenFunction,isauth:boolean}| undefined>(undefined);

type Props = {
    children?: ReactNode;
}
type SetTokenFunction = (newToken: string) => void;

const AuthProvider = ({ children }: Props) => {
    const [token, setToken_] = useState<string|null>(localStorage.getItem("Token"));
    const [isauth, setIsauth] = useState(false)

    const setToken: SetTokenFunction = (newToken: string) => {
        console.log("tom",newToken)
        setToken_(newToken);
    };


    useEffect(() => {
        const isvalidToken = (): Promise<Boolean> | Boolean => {
            return axios.get(`${process.env.REACT_APP_BASE_URL}/tracker/user/validateToken`, {
                headers: {
                    Authorization: token,
                },
            }).then((res) => {
                return res && res.status === 200;
            }).catch((err) => {
                return false;
            });
        }
        console.log(isvalidToken())
        if (isvalidToken()) {
            axios.defaults.headers.common["Authorization"] = token;
            // localStorage.setItem("Token", token);
            setIsauth(true)
        } else {
            console.log("clear all")
            delete axios.defaults.headers.common["Authorization"];
            localStorage.clear();
        }
    }, [token]);

    const contextValue: {token:string|null,setToken:SetTokenFunction,isauth:boolean} = useMemo(
        () => ({
            token,
            setToken,
            isauth,
        }),
        [token, isauth]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;