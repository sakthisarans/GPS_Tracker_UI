import './ProfileInfo.css'



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
}

function ProfileInfo({ signupFormData, handleSubmit }: signupFormDataPrope):JSX.Element{

    return(
        <div className="signupForm">
                    <h2>Sign Up</h2>
                    <ul className="noBullet">
                        <li>
                            <label htmlFor="username"></label>
                            <input type="text" className="inputFields" id="username" name="username" placeholder="Username"   />
                        </li>
                        <li>
                            <label htmlFor="email"></label>
                            <input type="email" className="inputFields" id="email" name="email" placeholder="Email"   />
                        </li>
                        <li>
                            <label htmlFor="password"></label>
                            <input type="password" className="inputFields" id="password" name="password" placeholder="Password"   />
                        </li>
                        <li>
                            <label htmlFor="Confirm Password"></label>
                            <input type="password" className="inputFields" id="confirmpassword" name="password" placeholder="Confirm Password"   />
                        </li>
                        
                        <li id="center-btn">
                            <input type="submit" id="join-btn" value="Next" onClick={()=>{handleSubmit("TrackerInfo")}} />
                        </li>
                    </ul>
                </div>
    )
}

export default ProfileInfo;