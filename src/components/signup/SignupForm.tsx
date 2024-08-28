import { Fragment } from 'react/jsx-runtime';
import './SignupForm.css'
import { useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import TrackerInfo from './TrackerInfo';

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
} | []
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
    Error: React.MutableRefObject<string>;
}

type signupFormStatePrope = {
    PannelName: string;
    PannelState: boolean;
}


function SignupForm({ signupFormData, handleSubmit, Error }: signupFormDataPrope): JSX.Element {

    const [signupFormState,] = useState<signupFormStatePrope[]>([{ PannelName: "PersonalInfo", PannelState: false }, { PannelName: "TrackerInfo", PannelState: true }, { PannelName: "AddressInfo", PannelState: false }])


    const onClickNext = (NextPannelName: string) => {
        signupFormState.map(x=>x.PannelState=false)
        signupFormState.forEach(x => {
            if (x.PannelName === NextPannelName) { x.PannelState=true }
        })
    }

    const getPannelState = (PannelName: string) => {
        var temp = false
        signupFormState.forEach(x => {
            if (x.PannelName === PannelName) { temp = x.PannelState }
        })
        return temp
    }

    return (
        <Fragment>
            <div className="signupSection">
                <div className="info">
                    <h2>Mission to Deep Space</h2>
                    <i className="icon ion-ios-ionic-outline" aria-hidden="true"></i>
                    <p>The Future Is Here</p>
                </div>
                {
                    (getPannelState("PersonalInfo"))?(<ProfileInfo signupFormData={signupFormData} handleSubmit={onClickNext} />)
                    
                    :

                    ((getPannelState("TrackerInfo"))?<TrackerInfo signupFormData={signupFormData} handleSubmit={onClickNext}/>:<p>address</p>)
                }

            </div>
        </Fragment>
    )
}

export default SignupForm;