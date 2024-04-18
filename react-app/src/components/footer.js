import {Link} from "react-router-dom";

export function Footer() {
    return (
        <footer>
            <div className="upperFooter">
                <h2>My Newsletter</h2>
                <h3>
                    Sign up to get an email <br/>every time I upload a new post.
                </h3>
                <div className="lowerFooter">
                    <form className="newsletter" id="newsletter">
                        <input type="text" className="emailAddress" id="emailAddress" placeholder="Email Address"/>
                        <label htmlFor="emailAddress">
                            <button className="subButton">Subscribe</button>
                        </label>
                    </form>
                    <Link to="/contact-us">Contact Me</Link>
                </div>
            </div>
            <hr/>
            <p className="copyRight">Copyright 2024 - Asaf Navoth</p>
        </footer>
    );
}