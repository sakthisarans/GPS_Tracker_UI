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


    const onUnameChange=(event: any)=>{
        name(event.target.value)
    }

    const onPwdChange=(event: any)=>{
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
                            <div className="inputBox">
                                <input type="password" required onChange={onPwdChange}/> <i>Password</i>
                            </div>
                            <div className="links">
                                <Link to="/aboutus">Forgot Password</Link>
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