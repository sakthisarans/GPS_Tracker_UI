import { Fragment } from "react/jsx-runtime";
import './LoginPage.css'
import { useEffect, useState } from "react";
import LoginForm from "../../components/login/LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { browserName, osName, osVersion, mobileModel, mobileVendor } from 'react-device-detect'
import { useAuth } from "../../Auth/AuthProvider";
function LoginPage(): JSX.Element {




    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [loginForm, setLoginForm] = useState({ uname: "", pwd: "", error: "" })

    const { setToken }: any = useAuth();
    const { isauth }:any = useAuth();

    useEffect(() => {
        if (isauth) {
            navigate("/home", { replace: true })
        }
    })
    const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();
        const data = {
            "email": loginForm.uname,
            "password": loginForm.pwd,
            "loginDevice": {
                "model": mobileModel + " " + mobileVendor,
                "platform": browserName,
                "os": osName,
                "osVersion": osVersion,
                "location": ""
            }
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/tracker/auth/user/signin`, data).then(res => {
            if (res.status === 200) {
                if (res.data.is2FAEnabled) {
                    setIsLogin(false)
                } else {
                    setToken(`${res.data.type} ${res.data.token}`);
                    localStorage.setItem("Token", `${res.data.type} ${res.data.token}`);
                    localStorage.setItem("Uname", res.data.username)
                    navigate("/home", { replace: true })
                }
            } else {
                setLoginForm({ ...loginForm, error: (res.data.error) })
            }
        }).catch(e => {
            console.log(e);
            (e.response.status === 406) ? setLoginForm({ ...loginForm, error: "Invalid userName / Password" }) : setLoginForm({ ...loginForm, error: "Something went wrong" });
        })
    }

    return (
        <Fragment>
            <section>
                <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                <div className="signin">
                    {isLogin ? (<LoginForm
                        loginForm={loginForm}
                        handleSubmit={handleSubmit}

                    />) : (<div>otp</div>)}
                </div>
            </section>
        </Fragment>
    )
}


export default LoginPage;


