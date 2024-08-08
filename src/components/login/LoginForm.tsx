import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

interface LoginFormProps {
    name: React.Dispatch<React.SetStateAction<string>>;
    password: React.Dispatch<React.SetStateAction<string>>;
    getError:string
    setError:React.Dispatch<React.SetStateAction<string>>;
    handleSubmit:any
  }

function LoginForm({name,password,getError,setError,handleSubmit}:LoginFormProps):JSX.Element{
    // const [getUnameError,setUnameError]=useState("")
    // const [getPwdeError,setPwdError]=useState("")

    const onUnameChange=(event: any)=>{
        if(false){
            // setUnameError("User name should be Email")
        }
        name(event.target.value)
    }

    const onPwdChange=(event: any)=>{
        if(false){
            // setPwdError("User password doesnt meet the requirement")
        }
        password(event.target.value)
    }


    return(
        <Fragment>
            <div className="content">
                        <h2>Sign In</h2>
                        <form className="form">
                            <div className="inputBox">
                                <input type="text" required onChange={onUnameChange}/> <i>Username</i>
                            </div>
                            {/* <span className="error" hidden={!!getUnameError}>
                                <p id="error">{getUnameError}</p>
                            </span> */}
                            <div className={"inputBox"}>
                                <input type="password" required onChange={onPwdChange}/> <i>Password</i>
                            </div>
                            {/* <span className={!!getPwdeError? "error": ""} hidden={!!getPwdeError}>
                                <p id="error">{getPwdeError}</p>
                            </span> */}
                            <div className="links">
                                <Link to="/home">Forgot Password</Link>
                                <Link to="/aboutus">Signup</Link>
                            </div>
                            <div className="inputBox">
                                <input type="submit" value="Login" onClick={(e)=>handleSubmit(e)} />
                            </div>
                            <span className="error" hidden={!!getError}>
                                <p id="error">{getError}</p>
                            </span>
                        </form>
                    </div>
        </Fragment>
    )
}

export default LoginForm;