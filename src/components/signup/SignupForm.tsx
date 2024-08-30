import { Fragment } from 'react/jsx-runtime';
import './SignupForm.css'
import { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import TrackerInfo from './TrackerInfo';
import AddressInfo from './AddressInfo';
import ProfilePic from './ProfilePic';
import { Tilt } from 'react-tilt';
import axios from 'axios';
import OtpPannel from './OtpPannel';
import { Link } from 'react-router-dom';

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
    Error: React.MutableRefObject<string>;
}

type signupFormStatePrope = {
    PannelName: string;
    PannelState: boolean;
}


function SignupForm({ signupFormData, Error }: signupFormDataPrope): JSX.Element {

    const [signupFormState, setSignupFormState] = useState<signupFormStatePrope[]>([{ PannelName: "PersonalInfo", PannelState: true }, { PannelName: "TrackerInfo", PannelState: false }, { PannelName: "AddressInfo", PannelState: false }, { PannelName: "OtpPannel", PannelState: false }])


    const onClickNext = (NextPannelName: string) => {
        const updatedState = signupFormState.map((x) => ({
            ...x,
            PannelState: x.PannelName === NextPannelName,
        }));
        setSignupFormState(updatedState);
    }
    const handleSubmit = async () => {
        console.log(signupFormData)
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/tracker/auth/user/signup`, signupFormData).then(res => {
                console.log(res)
                if (res.status === 201) {
                    axios.post(`${process.env.REACT_APP_BASE_URL}/tracker/auth/user/accountverify/generateotp`, { email: signupFormData.email }).then(res1 => {
                        if (res1.status === 200) {
                            onClickNext('OtpPannel')
                        }
                    })
                }else{
                    alert(res)
                }
            })

        }
        catch (err) {
            alert(err)
        }


    }

    const getCurrentPannel = (): JSX.Element => {
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
            if (currentPannel.PannelName === "OtpPannel") {
                return <OtpPannel email={signupFormData.email}/>
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
                            <ProfilePic signupFormData={signupFormData} />
                            
                        </Tilt>
                        
                        <Link to="/login" className='about-link-text-div'><span className='about-link-text'>Already Have Account</span></Link>

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