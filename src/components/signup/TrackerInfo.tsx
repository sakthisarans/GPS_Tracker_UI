import { useState } from 'react';
import './TrackerInfo.css'
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
}

function TrackerInfo({ signupFormData, handleSubmit }: signupFormDataPrope):JSX.Element{

    const [trackerIdError,setTrackerIdError]=useState<boolean>(false)
    const [trackerNameError,setTrackerNameError]=useState<boolean>(false)
    const [trackerData,setTrackerData]=useState<trackerPrope>({trackerID:'',vehicleNumber:''})

    const onTrackerIdUnblur = async (e: any) => {
        let trackerid: string = (e.target.value)
        if (trackerid) {
            setTrackerIdError(false)
            await axios.get(`${process.env.REACT_APP_BASE_URL}/tracker/auth/user/data/trackerid/${trackerid}`).then(res => {
                if (res.status === 200) {
                    if (res.data.status) {
                        setTrackerIdError(false)
                        setTrackerData((prevData) => ({
                            ...prevData,
                            trackerID: trackerid,
                          }));
                    } else {
                        setTrackerIdError(true)
                        alert("Invalid Tracker ID")
                    }
                } else {
                    setTrackerIdError(true)
                }
            }).catch(ex=>{
                alert(ex)
            })
        } else {
            setTrackerIdError(true)
        }
    }


    const onTrackerNameUnblur = async (e: any) => {
        let name=e.target.value
        if(name){
            setTrackerNameError(false)
            setTrackerData((prevData) => ({
                ...prevData,
                vehicleNumber: name,
              }));
        }else{
            setTrackerNameError(true)
        }
    }

    const onNext = () =>{
        if(!trackerIdError&&!trackerNameError){
            signupFormData.trackerList.push(trackerData)
            console.log(signupFormData)
            handleSubmit("AddressInfo")
        }

        
    }

    return(

        <div className="signupForm">
                    <h2>Sign Up</h2>
                    <ul className="noBullet trackerinfo">
                        <li>
                            <input type="text" className={trackerIdError ? "inputFields inputError" : "inputFields"}   placeholder="TrackerId" onBlur={onTrackerIdUnblur} />
                        </li>

                        <li>
                            <input type="text" className={trackerNameError ? "inputFields inputError" : "inputFields"} placeholder="Vehical No" onBlur={onTrackerNameUnblur}  />
                        </li>
                        
                        <li id="center-btn">
                            <input type="submit" id="join-btn1" value="Previous" onClick={()=>{handleSubmit("PersonalInfo")}} />
                            <input type="submit" id="join-btn" value="Next" onClick={onNext} />
                        </li>
                    </ul>

                </div>
    )
}

export default TrackerInfo;