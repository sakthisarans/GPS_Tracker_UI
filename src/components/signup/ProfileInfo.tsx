import { useState } from 'react';
import './ProfileInfo.css'
import axios from 'axios';



type addressPrope = {
    addresslane1: string;
    addresslane2: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

type trackerPrope = {
    trackerID: string;
    vehicleNumber: string;
} 
type additionalInfoPrope = {
    regionCode: string;
    currencyCode: string;
}
type signupFormPrope = {
    userName: string;
    profilePicture: string;
    password: string;
    email: string;
    contact: string;
    address: addressPrope;
    trackerList: trackerPrope[];
    additionalInfo: additionalInfoPrope;
    roleList: any[];
}


type signupFormDataPrope = {
    signupFormData: signupFormPrope;
    handleSubmit: any;
}

function ProfileInfo({ signupFormData, handleSubmit }: signupFormDataPrope): JSX.Element {

    const [emailErrors, setEmailErrors] = useState(false)
    const [unameErrors, setUnameErrors] = useState(false)
    const [passwordErrors, setPasswordErrors] = useState(false)
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState(false)
    const [regx,] = useState({ email: '^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$', password: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%^&?])(?!.*\\s)[a-zA-Z\\d!#$%^&?]{8,}$" })
    const [pwd, setPwd] = useState<string>()


    const onEmailUnblur = async (e: any) => {
        let mail: string = (e.target.value)
        if (!!mail.match(regx.email)) {
            setEmailErrors(false)
            await axios.get(`${process.env.REACT_APP_BASE_URL}/tracker/auth/user/data/email/${mail}`).then(res => {
                if (res.status === 200) {
                    if (res.data.status) {
                        setEmailErrors(false)
                        signupFormData.email = mail
                    } else {
                        setEmailErrors(true)
                        alert("User With Same Email Exists")
                    }
                } else {
                    setEmailErrors(true)
                }
            }).catch(ex=>{
                alert(ex)
            })
        } else {
            setEmailErrors(true)
        }

    }

    const onUnameUnblur = async (e: any) => {
        let uname: string = (e.target.value)
        if (uname) {
            setUnameErrors(false)
            signupFormData.userName = uname
        } else {
            setUnameErrors(true)
        }
    }

    const onPasswordBlur = (e: any) => {
        let password: string = (e.target.value)
        if (!!password.match(regx.password)) {
            setPasswordErrors(false)
            setPwd(password)
        } else {
            setPasswordErrors(true)
        }
    }
    const onConfirmPasswordBlur = (e: any) => {
        let password: string = (e.target.value)
        if (!!password.match(regx.password) && password === pwd) {
            setConfirmPasswordErrors(false)
            signupFormData.password = pwd;
        } else {
            setConfirmPasswordErrors(true)
        }
    }
    const onSubmit = () => {
        if (!unameErrors && !emailErrors && !passwordErrors && !confirmPasswordErrors) {
            console.log(signupFormData)
            handleSubmit("TrackerInfo")
        }
    }
    return (
        <div className="signupForm">
            <h2>Sign Up</h2>
            <ul className="noBullet">
                <li>
                    <label htmlFor="username"></label>
                    <input type="text" className={unameErrors ? "inputFields inputError" : "inputFields"} id="username" name="username" placeholder="Username" onBlur={onUnameUnblur} />
                </li>
                <li>
                    <label htmlFor="email"></label>
                    <input type="email" className={emailErrors ? "inputFields inputError" : "inputFields"} id="email" name="email"  placeholder="Email" onBlur={onEmailUnblur} />
                </li>
                <li>
                    <label htmlFor="password"></label>
                    <input type="text" className={passwordErrors ? "inputFields inputError" : "inputFields"} id="password" name="password"  placeholder="Password" onBlur={onPasswordBlur} />
                </li>
                <li>
                    <label htmlFor="Confirm Password"></label>
                    <input type="text" className={confirmPasswordErrors ? "inputFields inputError" : "inputFields"} id="confirmpassword" name="password" placeholder="Confirm Password" onBlur={onConfirmPasswordBlur} />
                </li>

                <li id="center-btn">
                    <input type="submit" id="join-btn" value="Next" onClick={onSubmit} />
                </li>
            </ul>
        </div>
    )
}

export default ProfileInfo;