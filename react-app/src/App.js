import {Header} from "./components/header";
import {Footer} from "./components/footer";
import "./styles/styles.css";
import "./styles/header.css";
import "./styles/footer.css";
import "./styles/articles.css";
import "./styles/hero.css";
import "./styles/forms.css"
import "./styles/errorpage.css"
import "./styles/category-page.css"
import "./styles/errorpage.css"
import {Outlet} from "react-router-dom";

export function App() {

    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>);
}

export default App;
