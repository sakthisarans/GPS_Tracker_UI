import { Fragment } from 'react/jsx-runtime';
import './SignupForm.css'
import { useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import TrackerInfo from './TrackerInfo';
import AddressInfo from './AddressInfo';
import ProfilePic from './ProfilePic';
import { Tilt } from 'react-tilt';

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

    const [signupFormState,setSignupFormState] = useState<signupFormStatePrope[]>([{ PannelName: "PersonalInfo", PannelState: true }, { PannelName: "TrackerInfo", PannelState: false }, { PannelName: "AddressInfo", PannelState: false }])


    const onClickNext = (NextPannelName: string) => {
        const updatedState = signupFormState.map((x) => ({
            ...x,
            PannelState: x.PannelName === NextPannelName,
        }));
        setSignupFormState(updatedState);
    }


    const getCurrentPannel = () :JSX.Element => {
        const currentPannel = signupFormState.find((x) => x.PannelState);
        if (currentPannel) {
            if (currentPannel.PannelName === 'PersonalInfo') {
                return <ProfileInfo signupFormData={signupFormData} handleSubmit={onClickNext} />;
            }
            if (currentPannel.PannelName === 'TrackerInfo') {
                return <TrackerInfo signupFormData={signupFormData} handleSubmit={onClickNext} />;
            }
            if (currentPannel.PannelName === 'AddressInfo') {
                return <AddressInfo signupFormData={signupFormData} handleSubmit={onClickNext} onclickSignup={handleSubmit} />;
            }
        }
        return <></>;
    }

    return (
        <Fragment>
            <div className="signupSection">
                <div className="info">
                    <h2>Mission to Deep Space</h2>
                    <p>The Future Is Here</p>
                    <div className="icon" >
                        <Tilt>
                            <ProfilePic signupFormData={signupFormData}/>
                        </Tilt>
                    </div>
                    
                </div>
                {
                    (getCurrentPannel())
                }
            </div>
        </Fragment>
    )
}

export default SignupForm;