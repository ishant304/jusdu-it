import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function Footer(){
    return(
        <div>
            <div className="footer-section">
                <div className="left-footer">
                    <h3 className="left-logo-name">Jusdu It</h3>
                    <p className="left-logo-caption">Literally, Just do it !</p>
                    <div className="brand-div">
                        <a className="brand" target="_blank" href="https://www.linkedin.com/in/ishant-srivastava-283184231/"><FontAwesomeIcon icon={faLinkedin} /></a>
                        <a className="brand" target="_blank" href="https://github.com/ishant304"><FontAwesomeIcon icon={faGithub} /></a>
                        <a className="brand" target="_blank" href="https://www.instagram.com/whats_the_ishu?igsh=MTZsdXlmdDYzbGFkcw%3D%3D&utm_source=qr"><FontAwesomeIcon icon={faInstagram} /></a>
                    </div>
                </div>
                <div className="middle-footer">
                    <h3 className="middle-heading">Quick Links</h3>
                    <Link className="footer-link" to='/'>Home</Link>
                    <Link className="footer-link" to='/#features'>Features</Link>
                    <Link className="footer-link" to='/todolist'>To-do List</Link>
                </div>
                <div className="right-footer">
                    <h3 className="right-heading">Contact me</h3>
                    <a className="footer-link" href="tel:7275597976">Call me <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
                    <a className="footer-link" href="https://wa.me/917275597976">Message me <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
                    <a className="footer-link" href="mailto:ishantishu125@gmail.com">Email me <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
                </div>
            </div>
            <div className="seprator2"></div>
            <p className="credit">Made with <FontAwesomeIcon icon={faHeart}/> by Ishant Srivastava</p>
        </div>
    )
}