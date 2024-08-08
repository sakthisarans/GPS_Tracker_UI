import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

function HomePage(){
    const navigate=useNavigate()
    const onclick=()=>{
navigate("/profile")
    }
  return(
    <Fragment>
        <div>
            <button onClick={onclick}>
onClick
            </button>
        </div>
    </Fragment>
  )
}

export default HomePage;