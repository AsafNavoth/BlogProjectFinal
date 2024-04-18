import {About} from "./about";
import {Posts} from "./posts";

export function Home() {
    return (
        <>
            <About/>
            <main>
                <Posts/>
            </main>
        </>
    )
}