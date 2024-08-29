import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type inputPropes = {
    email: string;
}

function OtpPannel({ email }: inputPropes): JSX.Element {

    const [OtpError, setOtpError] = useState<boolean>(false)
    const [otpdata, setotpdata] = useState<string>()
    const navigate = useNavigate()


    const handleSubmit = () => {
        if (!OtpError) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/tracker/auth/user/accountverify/verifyotp`, { email: email, otp: otpdata }).then(otpres => {
                if (otpres.status === 202) {
                    navigate("/login", { replace: true })
                }
            })
        }
    }

    const onOtpBlur = (e: any) => {
        var otp: string = e.target.value
        if (otp.length === 6) {
            setotpdata(otp)
            setOtpError(false)
        } else {
            setOtpError(true)
        }
    }
    return (
        <div className="signupForm">
            <h2 className="h2verify">Verification</h2>
            <ul className="noBullet trackerinfo">
                <li>
                    <input type="text" className={OtpError ? "inputFields otp inputError" : "inputFields otp"} placeholder="Please enter OTP" onBlur={onOtpBlur} />
                </li>

                <li id="center-btn">
                    <input type="submit" id="join-btn1" value="Submit" onClick={handleSubmit} />
                </li>
            </ul>

        </div>
    )
}

export default OtpPannel;