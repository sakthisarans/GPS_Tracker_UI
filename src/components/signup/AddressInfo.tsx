import './AddressInfo.css'
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
    onclickSignup:any;
}
function AddressInfo ({ signupFormData, handleSubmit,onclickSignup }: signupFormDataPrope):JSX.Element{
    return (<div className="signupForm">
        <h2>Sign Up</h2>
        <ul className="noBullet">
            <li>
                <input type="text" className="inputFields address" id="username" name="username" placeholder="Address Lane 1"   />
                <input type="email" className="inputFields address" id="email" name="email" placeholder="Address Lane 2"   />
            </li>
            
            <li>
                
                <input type="text" className="inputFields address" id="city" name="password" placeholder="City"/>
                <input type="text" className="inputFields address" id="state" name="password" placeholder="State"/>
            </li>
            <li>
                <input type="text" className="inputFields address" id="password" name="password" placeholder="Country"   />
                <input type="text" className="inputFields address" id="password" name="password" placeholder="Zip Code"   />
            </li>
            <li>
                <input type="text" className="inputFields" id="password" name="password" placeholder="Contact Number"   />
            </li>
            
            <li id="center-btn">
            <input type="submit" id="join-btn1" value="Previous" onClick={()=>{handleSubmit("TrackerInfo")}} />
            <input type="submit" id="join-btn" value="SignUp" onClick={()=>{onclickSignup()}} />
            </li>
            
        </ul>
    </div>)
}


export default AddressInfo;