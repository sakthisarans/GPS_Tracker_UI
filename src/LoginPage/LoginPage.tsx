import logo from '../Resources/loginLogo.png'
import './LoginPage.css'
import './util.css'
import {useState} from "react";
import { Tilt } from 'react-tilt'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailAlert, setEmailAlert] = useState({"state":false,"message":""});
    const [passwordAlert, setPasswordAlert] = useState({"state":false,"message":""});
    const [isValidCredentials, setIsValidCredentials] = useState({"status":false,"message":""});
    const [loading, setLoading] = useState<boolean>(false);

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const navigate = useNavigate()

    const emailRegx : string ="^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$"
    const passwordRegx : string ="^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%^&?])(?!.*\\s)[a-zA-Z\\d!#$%^&?]{8,}$"

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)

        let token:Promise<string | void>=fetch(`${process.env.REACT_APP_API_URL}/tracker/auth/user/signin`,{
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body:JSON.stringify({email:email, password:password})
        }).then(res=> {
            if(res.status === 200) {
               return (res.json())
            }else if(res.status === 406){
                isValidCredentials.status=false
                isValidCredentials.message="Invalid Credentials"
            }
        }).then(data=> {
            if(data["token"]) {
                setCookie('token', data["type"] + " " + data['token'])
                navigate("/home")
            }
            }
        ).catch(err=>{
                isValidCredentials.status=false;
                isValidCredentials.message=err.message;
            }
        );
        setLoading(false)
    }
    const validateEmail = () =>{
        if(email.match(emailRegx)){
            setEmailAlert(emailAlert) }
        else
        {
            emailAlert.state=true
            emailAlert.message="Valid email is required: ex@abc.xyz"
        }
    }
    const validatePassword = () =>{
        if(password.length===0){
            passwordAlert.state=true
            passwordAlert.message="Password is required"
        }
        else if(password.match(passwordRegx)){
            setPasswordAlert(passwordAlert) }
        else
        {
            passwordAlert.state=true
            passwordAlert.message="Password must contain at least 1 lowercase letter 1 special character and characters of length at least 8"
        }
    }

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <Tilt>
                    <div className="login100-pic" data-tilt>
                        <img src={logo} alt="IMG"/>
                    </div>
                    </Tilt>

                    <form className="login100-form validate-form" onSubmit={handleSubmit}>
					<span className="login100-form-title">
						Member Login
					</span>

                        <div className={`wrap-input100 validate-input${emailAlert.state ? " alert-validate":""}`} data-validate = {emailAlert.message}>
                            <input className= {`input100`} type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                        </div>

                        <div className={`wrap-input100 validate-input${passwordAlert.state ? " alert-validate":""}`} data-validate = {passwordAlert.message}>
                            <input className="input100" type="text" name="pass" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
                        </div>

                        <div className="container-login100-form-btn">
                            <button disabled={loading} className="login100-form-btn">
                                <span className={!loading ? "":"Loading"}>
                                    {!loading ? "Login" : ""}
                                </span>
                            </button>
                        </div>

                        <div className="text-center p-t-12">
						<span className="txt1">
							Forgot
						</span>
                            <a className="txt2" href="#">
                                Username / Password?
                            </a>
                        </div>

                        <div className="text-center p-t-136">
                            <a className="txt2" href="#">
                                Create your Account
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;