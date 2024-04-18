import {Link, useRouteError} from "react-router-dom";
import {Header} from "./header";
import {Footer} from "./footer";

export function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error-page" id="error-page">
            <Header/>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
                <p><Link to="/">Return Home</Link></p>
            </p>
            <Footer/>
        </div>
    );
}