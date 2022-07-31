import Meter from "./components/Meter";
import Subtitle from "./components/Subtitle";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Warning from "./components/Warning";
// import notyf from "./notyf";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Verify from "./components/Verify";

const App = () => {
    const [verified, setVerified] = useState("checking");

    useEffect(() => {
        localStorage.getItem("verified") === "true"
            ? setVerified(true)
            : setVerified(false);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HUD verified={verified} />} />
                <Route
                    exact
                    path="/verify"
                    element={<Verify setVerified={setVerified} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

const HUD = ({ verified }) => {
    const [text, setText] = useState("");
    const [warning, setWarning] = useState(0);
    const [warningBox, setWarningBox] = useState(false);

    useEffect(() => {
        warning > 2 && window.close();
        warning > 0 && setWarningBox(true);
    }, [warning]);

    useEffect(() => {
        !verified
            ? (window.location.href = "/verify")
            : console.log("verified");
    }, [verified]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         notyf.error("Too much time spent");
    //     }, 3000);
    //     setTimeout(() => {
    //         window.close();
    //     }, 5000);
    // }, []);

    return (
        <div className="hud w-screen h-screen">
            <Meter
                setText={setText}
                setWarning={setWarning}
                warning={warning}
            />
            <AnimatePresence>
                {text !== "" && <Subtitle key={1} text={text} />}
                {warningBox && (
                    <Warning setWarningBox={setWarningBox} key={2} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
