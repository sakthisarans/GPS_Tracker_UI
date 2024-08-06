import { Fragment } from "react/jsx-runtime";
import "./NotFound.css"
import { useNavigate } from "react-router-dom";

function NotFound(): JSX.Element {
    const navigate=useNavigate()
    return (
        <Fragment>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                        <h2>Page not found</h2>
                    </div>
                    <button onClick={()=>navigate('/home',{ replace: true })}>Homepage</button>
                    
                </div>
            </div>
        </Fragment>
    )
}

export default NotFound;