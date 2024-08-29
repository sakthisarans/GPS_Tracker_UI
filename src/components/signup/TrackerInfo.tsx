import './TrackerInfo.css'



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

function TrackerInfo({ signupFormData, handleSubmit }: signupFormDataPrope):JSX.Element{

    return(

        <div className="signupForm">
                    <h2>Sign Up</h2>
                    <ul className="noBullet trackerinfo">
                        <li>
                            <label htmlFor="username"></label>
                            <input type="text" className="inputFields" id="username" placeholder="TrackerId"  />
                        </li>

                        <li>
                            <label htmlFor="Confirm Password"></label>
                            <input type="password" className="inputFields" id="password" placeholder="Vehical No"  />
                        </li>
                        
                        <li id="center-btn">
                            <input type="submit" id="join-btn1" value="Previous" onClick={()=>{handleSubmit("PersonalInfo")}} />
                            <input type="submit" id="join-btn" value="Next" onClick={()=>{handleSubmit("AddressInfo")}} />
                        </li>
                    </ul>

                </div>
    )
}

export default TrackerInfo;