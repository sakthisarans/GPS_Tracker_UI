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

    const setToken = (newToken: string) => {
        console.log("token",newToken)
        setToken_(newToken);
    };


    useEffect(() => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/tracker/user/validateToken`, {
                headers: {
                    Authorization: token,
                },
            }).then((res) => {
                if(res && res.status === 200){
                    axios.defaults.headers.common["Authorization"] = token;
                    setIsauth(true)
                }else{
                    setIsauth(false)
                    console.log("clear all")
                    delete axios.defaults.headers.common["Authorization"];
                    localStorage.clear();
                }
            }).catch((err) => {
                console.log(err)
                setIsauth(false)
                console.log("clear all")
                delete axios.defaults.headers.common["Authorization"];
                localStorage.clear();
            });
    },[]);

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