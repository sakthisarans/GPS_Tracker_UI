import { Fragment } from 'react/jsx-runtime';
import './SignupPage.css'
import { useAuth } from '../../Auth/AuthProvider';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../../components/signup/SignupForm';
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
}|[]
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

function SignupPage() {

    const { isauth }: any = useAuth();
    const navigate = useNavigate()

    const Error=useRef<string>("")

    const [signupFormData, ]=useState<signupFormPrope>({"userName": "","profilePicture": "","password": "","email": "","contact": "","address": {"addresslane1": "","addresslane2": "","city": "","state": "","country": "","zipCode": ""},"trackerList": [ ],"additionalInfo": {"regionCode": "","currencyCode": ""},"roleList": []});
    const [isAccountCreated,setIsAccountCreated]=useState<boolean>(false);
    useEffect(() => {
        if (isauth) {
            navigate("/home", { replace: true })
        }
    })

    const OnSubmit=()=>{
        axios.post(`${process.env.REACT_APP_BASE_URL}/tracker/auth/user/signin`, signupFormData).then(res => {
            if (res.status === 200) {
                setIsAccountCreated(true)
            }    
        }).catch(e => {
            
        })
    }
    return (
        <Fragment>
                {isAccountCreated?(<p>OTP</p>):
                (<SignupForm signupFormData={signupFormData} handleSubmit={OnSubmit} Error={Error}/>)
                }
        </Fragment>
    )
}

export default SignupPage;