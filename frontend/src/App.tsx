import { RecoilRoot } from "recoil";
import "./App.css";
import { FrontPage } from "./pages/FrontPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <RecoilRoot>
                <FrontPage />
                <ToastContainer />
            </RecoilRoot>
        </>
    );
}

export default App;
