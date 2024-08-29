import { useState } from 'react';
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
    onclickSignup: any;
}
function AddressInfo({ signupFormData, handleSubmit, onclickSignup }: signupFormDataPrope): JSX.Element {

    const [addressData, setAddressData] = useState<addressPrope>({ addresslane1: "", addresslane2: "", city: "", state: "", country: "", zipCode: "" })
    const [Errors, setErrors] = useState({ addLane1: false, addLane2: false, city: false, state: false, country: false, zip: false,contact:false })

    const onAddresslaneOneBlur = (e: any) => {
        let temp = e.target.value
        if (temp) {
            setErrors((prevData) => ({
                ...prevData,
                addLane1: false,
            }));
            setAddressData((prevData) => ({
                ...prevData,
                addresslane1: temp,
            }));

        } else {
            setErrors((prevData) => ({
                ...prevData,
                addLane1: true,
            }));
        }
    }

    const onAddresslaneTwoBlur = (e: any) => {
        let temp = e.target.value
        if (temp) {
            setErrors((prevData) => ({
                ...prevData,
                addLane2: false,
            }));
            setAddressData((prevData) => ({
                ...prevData,
                addresslane2: temp,
            }));

        } else {
            setErrors((prevData) => ({
                ...prevData,
                addLane2: true,
            }));
        }
    }

    const onCityBlur = (e: any) => {
        let temp = e.target.value
        if (temp) {
            setErrors((prevData) => ({
                ...prevData,
                city: false,
            }));
            setAddressData((prevData) => ({
                ...prevData,
                city: temp,
            }));

        } else {
            setErrors((prevData) => ({
                ...prevData,
                city: true,
            }));
        }
    }

    const onStateBlur = (e: any) => {
        let temp = e.target.value
        if (temp) {
            setErrors((prevData) => ({
                ...prevData,
                state: false,
            }));
            setAddressData((prevData) => ({
                ...prevData,
                state: temp,
            }));

        } else {
            setErrors((prevData) => ({
                ...prevData,
                state: true,
            }));
        }
    }

    const onCountryBlur = (e: any) => {
        let temp = e.target.value
        if (temp) {
            setErrors((prevData) => ({
                ...prevData,
                country: false,
            }));
            setAddressData((prevData) => ({
                ...prevData,
                country: temp,
            }));

        } else {
            setErrors((prevData) => ({
                ...prevData,
                country: true,
            }));
        }
    }

    const onZipBlur = (e: any) => {
        let temp = e.target.value
        if (temp) {
            setErrors((prevData) => ({
                ...prevData,
                zip: false,
            }));
            setAddressData((prevData) => ({
                ...prevData,
                zipCode: temp,
            }));

        } else {
            setErrors((prevData) => ({
                ...prevData,
                zip: true,
            }));
        }
    }

    const onContactBlur = (e: any) => {
        let temp = e.target.value
        if (temp) {
            setErrors((prevData) => ({
                ...prevData,
                contact: false,
            }));
            signupFormData.contact=temp
        } else {
            setErrors((prevData) => ({
                ...prevData,
                contact: true,
            }));
        }
    }

    const onNext=()=>{
        if(!Errors.addLane1 &&
            !Errors.addLane2 &&
            !Errors.city &&
            !Errors.state &&
            !Errors.country &&
            !Errors.zip &&
            !Errors.contact)
        {
            signupFormData.address=addressData
            onclickSignup()
        }
    }

    return (<div className="signupForm">
        <h2>Sign Up</h2>
        <ul className="noBullet">
            <li>
                <input type="text" className={!Errors.addLane1 ? "inputFields address" : "inputFields address inputError"}  placeholder="Address Lane 1" onBlur={onAddresslaneOneBlur} />
                <input type="email" className={!Errors.addLane2 ? "inputFields address" : "inputFields address inputError"}  placeholder="Address Lane 2" onBlur={onAddresslaneTwoBlur}/>
            </li>

            <li>

                <input type="text" className={!Errors.city ? "inputFields address" : "inputFields address inputError"}  placeholder="City" onBlur={onCityBlur}/>
                <input type="text" className={!Errors.state ? "inputFields address" : "inputFields address inputError"}  placeholder="State" onBlur={onStateBlur} />
            </li>
            <li>
                <input type="text" className={!Errors.country ? "inputFields address" : "inputFields address inputError"}  placeholder="Country" onBlur={onCountryBlur}/>
                <input type="text" className={!Errors.zip ? "inputFields address" : "inputFields address inputError"}  placeholder="Zip Code" onBlur={onZipBlur}/>
            </li>
            <li>
                <input type="text" className={!Errors.contact ? "inputFields" : "inputFields inputError"}  placeholder="Contact Number" onBlur={onContactBlur} />
            </li>

            <li id="center-btn">
                <input type="submit" id="join-btn1" value="Previous" onClick={() => { handleSubmit("TrackerInfo") }} />
                <input type="submit" id="join-btn" value="SignUp" onClick={onNext} />
            </li>

        </ul>
    </div>)
}


export default AddressInfo;