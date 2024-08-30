import { Fragment, useEffect, useRef, useState } from 'react';
import './ProfileBatch.css'
import axios from 'axios';

function ProfileBatch() {
    const isOnline = useRef<boolean>(false)
    const [image,setImage]=useState<string>('')
    const [hideSummar,sethideSummar]=useState<boolean>(true)
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BASE_URL}/tracker/emqx/user/getprofile`).then(res=>{
            if(res.status===200){
                setImage(res.data.image)
            }
        }).catch(ex=>{
            alert(ex)
        })

    },[])

    const logOut=()=>{
                delete axios.defaults.headers.common["Authorization"];
                localStorage.clear();
                window.location.reload();
    }

    return (
        <Fragment>
        <div className='profile' onClick={()=>{sethideSummar(!hideSummar)}}>
            <img className='image' src={image}></img>
        </div>
        {!hideSummar &&
        <div className='profileSummary'>
            <div className='close' onClick={()=>{sethideSummar(true)}}>
                <p>X</p>
            </div>
            <div className='profiledetail'>
                <img className='image' src={image}></img>
                <p>Nao</p>
            </div>
            <div>
            <ul>
                <li className='li'>
                    <button className='button'>Settings</button>
                </li>
                <li className='li'>
                <button className='button' onClick={logOut}>Log Out</button>
                </li>
            </ul>
            </div>
        </div>}
        </Fragment>
        )
}

export default ProfileBatch;