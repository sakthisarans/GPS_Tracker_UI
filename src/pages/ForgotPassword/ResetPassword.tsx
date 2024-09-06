import { useEffect, useState } from "react";
import './ResetPassword.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import axios from "axios";

function ResetPassword(){
    const [searchParams] = useSearchParams();
    const [token,setToken] = useState<string|null>(searchParams.get('resetToken'))
    const [inputState,setInputState] =useState({validPwd:false,pwdTouched:false,validconfirmPwd:false,confirmpwdTouched:false})
    const [password,setPassword] = useState<string>('')
    const [,setConfirmPassword] = useState<string>('')
    const navigate = useNavigate()
    const pwdRegx='^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%^&?])(?!.*\\s)[a-zA-Z\\d!#$%^&?]{8,}$'
    
    useEffect(()=>{
        setToken(searchParams.get('resetToken'));
        console.log(token)
        if(!token){
            navigate("/login", { replace: true })
        }
    })

    const pwdOnChange=(e:any)=>{
        let pwd=e.target.value
        setPassword(pwd)
        console.log(!!pwd.match(pwdRegx),pwd)
        if(!!pwd.match(pwdRegx)){
            {setInputState((prevData) => ({
                ...prevData,
                validPwd: true,
            }));}
        }else{
            {setInputState((prevData) => ({
                ...prevData,
                validPwd: false,
            }));}
        }
    }
    const confirmPwdOnChange=(e:any)=>{
        let pwd=e.target.value
        setConfirmPassword(pwd)
        if(pwd===password){
            {setInputState((prevData) => ({
                ...prevData,
                validconfirmPwd: true,
            }));}
        }else{
            {setInputState((prevData) => ({
                ...prevData,
                validconfirmPwd: false,
            }));}
        }
    }

    const buttonOnClick = () =>{
        if((inputState.validPwd&&inputState.pwdTouched)&&(inputState.validconfirmPwd&&inputState.confirmpwdTouched)){
            axios.put(`${process.env.REACT_APP_BASE_URL}/tracker/auth/user/resetpassword`,{password:password},{params:{"resetToken":token}}).then(res=>{
                if(res.status===202){
                    navigate("/login", { replace: true })
                }
            }).catch(err=>{alert(err)})
        }
    }
    
    return (<Fragment>
        
        <div className="card">
            <p className="lock-icon"> <i className="fas fa-lock"></i></p>
            <h2>Enter Password</h2>
            <p>You can reset your Password here</p>
            <input type="text" className={(!inputState.validPwd&&inputState.pwdTouched)?"passInput error":"passInput"} placeholder="Password" onChange={pwdOnChange} onBlur={()=>{setInputState((prevData) => ({
            ...prevData,
            pwdTouched: true,
        }));}} />
        <input type="text" className={(!inputState.validconfirmPwd&&inputState.confirmpwdTouched)?"passInput error":"passInput"} onChange={confirmPwdOnChange} placeholder="Confirm Password" onBlur={()=>{setInputState((prevData) => ({
            ...prevData,
            confirmpwdTouched: true,
        }));}} />
            <button onClick={buttonOnClick} disabled={((!inputState.validPwd&&inputState.pwdTouched)||(!inputState.validconfirmPwd&&inputState.confirmpwdTouched))}>Reset Password</button>
        </div>
    </Fragment>)
}

export default ResetPassword;