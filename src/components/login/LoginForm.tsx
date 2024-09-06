import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

interface LoginFormProps {
    loginForm: {
        uname: string;
        pwd: string;
        error: string;
    };
    handleSubmit:any
  }

function LoginForm({loginForm,handleSubmit}:LoginFormProps):JSX.Element{
    const onUnameChange=(event: any)=>{
        if(false){
            // setUnameError("User name should be Email")
        }
        loginForm.uname=(event.target.value)
    }

    const onPwdChange=(event: any)=>{
        if(false){
            // setPwdError("User password doesnt meet the requirement")
        }
        loginForm.pwd=(event.target.value)
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
                                <Link to="/forgotpassword">Forgot Password</Link>
                                <Link to="/signup">Signup</Link>
                            </div>
                            <div className="inputBox">
                                <input type="submit" value="Login" onClick={(e)=>handleSubmit(e)} />
                            </div>
                            <span className="error" hidden={!!loginForm.error}>
                                <p id="error">{(loginForm.error)}</p>
                            </span>
                        </form>
                    </div>
        </Fragment>
    )
}

export default LoginForm;