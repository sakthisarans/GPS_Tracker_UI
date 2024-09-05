import { Fragment } from 'react/jsx-runtime';
import './SignupPage.css'
import { useAuth } from '../../Auth/AuthProvider';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../../components/signup/SignupForm';
import LoadingComponent from '../../components/Loading/LoadingComponent';


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

function SignupPage() {

    const { isauth }: any = useAuth();
    const navigate = useNavigate()
    const Error=useRef<string>("")
    const [signupFormData, ]=useState<signupFormPrope>({"userName": "","profilePicture": "","password": "","email": "","contact": "","address": {"addresslane1": "","addresslane2": "","city": "","state": "","country": "","zipCode": ""},"trackerList": [ ],"additionalInfo": {"regionCode": "","currencyCode": ""},"roleList": []});
    useEffect(() => {
        if (isauth===true) {
            navigate("/home", { replace: true })
        }
    })

    return (
        <Fragment>
            {isauth===undefined ? <LoadingComponent />
            : 
                <SignupForm signupFormData={signupFormData} Error={Error}/>
            }
        </Fragment>
    )
}

export default SignupPage;