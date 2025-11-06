import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import logo from "./assets/logo.png"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight"
import { useNavigate } from "react-router"

export default function Hero() {

    const navigate = useNavigate();

    return (
        <>
            <div id="home" className="header">
                <div className="logo-div">
                    <img className="logo" src={logo} alt="logo" />
                    <p className="logo-name">Jusdu It</p>
                </div>
                <h1 className="hero-heading">Stop Waiting. <br /> Just Do It <br /> and tick it off</h1>
                <button onClick={()=>navigate('/todolist')} className="get-started-btn">Get started <FontAwesomeIcon icon={faChevronRight} /></button>
                < p className="hero-caption">Organize your tasks, stay focused, and take action. <br /> Add your tasks, stay on track, and enjoy the feeling of <br /> checking them off. </p>
            </div>
            <div className="seprator"></div>

        </>
    )
}