import { Fragment } from "react/jsx-runtime";
import './ForgotPassword.css'
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
    const [emailInput,setEmailInput]=useState({validEmail:false,toucked:false})
    const [email,setEmail]=useState('')
    const [showSpan,setShowSpan]=useState({isShow:true,message:""})
    const emailRegx= '^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$'
    const emailOnBlur = (e:any) =>{
        
        setEmail(e.target.value)
        if(!email.match(emailRegx)){
            setEmailInput((prevData) => ({
                ...prevData,
                validEmail: false,
            }));
        }else{
            setEmailInput((prevData) => ({
                ...prevData,
                validEmail: true,
            }));
        }
    }
    const buttonOnClick=async ()=>{
        if(email){
            await axios.post(`${process.env.REACT_APP_BASE_URL}/tracker/auth/user/generateresetlink`,{email:email}).then(res=>{
                if(res.status===200){
                    setShowSpan((prevData) => ({
                        ...prevData,
                        isShow: false,
                        message:"Your reset link is sent to your email"
                    }));
                }else if(res.status===429||res.status===208){
                    setShowSpan((prevData) => ({
                        ...prevData,
                        isShow: false,
                        message:"Reset Link Alreast Sent Please Check Your Email"
                    }));
                }else if(res.status===400||res.status===404){
                    setShowSpan((prevData) => ({
                        ...prevData,
                        isShow: false,
                        message:"User Not Found"
                    }));
                }
            }).catch(err=>{alert(err)})
            
        }else{
            setEmailInput((prevData) => ({
                ...prevData,
                validEmail: false,
            }));
        }
    }
    return (<Fragment>
        
        <div className="card">
            <p className="lock-icon"> <i className="fas fa-lock"></i></p>
            <h2>Forgot Password?</h2>
            <p>You can reset your Password here</p>
            <input type="text" className={(!emailInput.validEmail&&emailInput.toucked)?"passInput error":"passInput"} placeholder="Email address" onChange={emailOnBlur} onBlur={()=>{setEmailInput((prevData) => ({
            ...prevData,
            toucked: true,
        }));}} />
            <button onClick={buttonOnClick} disabled={(!emailInput.validEmail&&emailInput.toucked)}>Reset Password</button>
            <span className="span" hidden={showSpan.isShow}>{showSpan.message}</span>
            <a className="redirect" href="/login">Back to Login</a>
        </div>
    </Fragment>)
}

export default ForgotPassword;