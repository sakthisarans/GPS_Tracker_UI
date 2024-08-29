import { useEffect, useRef, useState } from 'react';
import './ProfilePic.css'
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
}


function ProfilePic ({ signupFormData }: signupFormDataPrope){


    const imageUrl=useRef<string>("https://api.sakthisaran.site/tracker/resource/images/profilepicture/zrqnnfjxpv.jpg")

    const [image, setImage] = useState({ preview: "", raw: "" });

    const uploadImage=async (e:any)=>{
        if (e.target.files.length) {
            setImage({
              preview: URL.createObjectURL(e.target.files[0]),
              raw: e.target.files[0]
            });
          }
    }
    useEffect(()=>{
        if(image.raw){
            const formData = new FormData();
            formData.append('file', image.raw);
            axios.post(`${process.env.REACT_APP_BASE_URL}/tracker/resource/images/profilepicture`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }).then(res=>{
                signupFormData.profilePicture=res.data.uri
            }).catch(error=>{
                setImage({ preview: "", raw: "" })
                alert("Upload Picture Failed Try Again")
            });
        }
    })

return (
<div>
    <label htmlFor="upload-button">
   <img className='image' alt="dummy" src={image.preview?image.preview:imageUrl.current} />
   </label>
   <input type="file" className='myfile' id="upload-button" onChange={uploadImage} />
</div>
)
}

export default ProfilePic;