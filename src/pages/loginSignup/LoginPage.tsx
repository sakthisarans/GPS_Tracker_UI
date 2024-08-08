import { Fragment } from "react/jsx-runtime";
import './LoginPage.css'
import { useEffect, useState } from "react";
import LoginForm from "../../components/login/LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {browserName, osName, osVersion, mobileModel, mobileVendor} from 'react-device-detect'

function LoginPage(): JSX.Element {
    const navigate=useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [getUname, setUname] = useState("")
    const [getPwd, setPwd] = useState("")
    const [getError, setError] = useState("")

    useEffect(()=>{
        if(localStorage.getItem("Token")!=null){
            navigate("/home",{replace:true})
        }
    })

    const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.preventDefault();

        const data={
            "email": getUname, 
            "password": getPwd,
            "loginDevice": {
                "model": mobileModel+" "+mobileVendor,
                "platform": browserName,
                "os": osName,
                "osVersion": osVersion,
                "location": ""
            }
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/tracker/auth/user/signin`, data).then(res => {
            if(res.status===200){
                if(res.data.is2FAEnabled){
                    setIsLogin(false)
                }else{
                    localStorage.setItem("Token",`${res.data.type} ${res.data.token}`)
                    localStorage.setItem("Uname",res.data.username)
                    navigate("/home",{replace:true})
                    navigate(0)
                }
            }else{
                setError(res.data.error)
            }
        }).catch(e=>{
            console.log(e)
            setError("Invalid userName / Password")
        })
    }

    return (
        <Fragment>
            <section>
                <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                <div className="signin">
                    {isLogin ? (<LoginForm
                        name={setUname}
                        password={setPwd}
                        handleSubmit={handleSubmit}
                        getError={getError}
                        setError={setError}

                    />) : (<div>otp</div>)}
                </div>
            </section>
        </Fragment>
    )
}


export default LoginPage;