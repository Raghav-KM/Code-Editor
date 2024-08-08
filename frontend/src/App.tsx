import { RecoilRoot } from "recoil";
import "./App.css";
import { FrontPage } from "./pages/FrontPage";

function App() {
    return (
        <>
            <RecoilRoot>
                <FrontPage />
            </RecoilRoot>
        </>
    );
}

export default App;
