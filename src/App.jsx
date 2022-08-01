import Meter from "./components/Meter";
import Subtitle from "./components/Subtitle";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Warning from "./components/Warning";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Verify from "./components/Verify";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { Peer } from "peerjs";
import Index from "./components/Index";
import Redirect from "./components/Redirect";

const NODE_ENV = process.env.REACT_APP_NODE_ENV;
const api_url =
    NODE_ENV === "dev"
        ? "http://localhost:4000"
        : "https://minet-22.herokuapp.com";
console.log(api_url);

const socket = io(api_url);

const App = () => {
    const [verified, setVerified] = useState("checking");

    useEffect(() => {
        // VERIFICAION
        localStorage.getItem("verified") === "true"
            ? setVerified(true)
            : setVerified(false);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    // element={<Redirect verified={verified} />}
                    element={<Index verified={verified} />}
                />
                <Route
                    exact
                    path="/redirect"
                    element={<Redirect verified={verified} />}
                />
                <Route
                    exact
                    path="/:room"
                    element={<HUD verified={verified} />}
                />
                <Route
                    exact
                    path="/verify"
                    element={<Verify setVerified={setVerified} />}
                />
                <Route
                    exact
                    path="/verify/:room"
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
        !verified ? (window.location.href = "/verify") : console.log("");
    }, [verified]);

    useEffect(() => {
        setInterval(() => {
            setWarningBox(true);
        }, 60000);
    }, []);

    // CALL --------------------------------------------------------------------------------------------------------------------------------
    const { roomId } = useParams();

    useEffect(() => {
        const peer = new Peer(undefined, {
            host: NODE_ENV === "dev" ? "/" : "peerjs-server.herokuapp.com",
            port: NODE_ENV === "dev" ? "4001" : "443",
        });

        socket.on("new-user", (userId) =>
            console.log("User Connected", userId)
        );

        const newVideo = document.createElement("video");
        newVideo.muted = true;
        let peers = {};

        navigator.mediaDevices
            .getUserMedia({
                video: false,
                audio: true,
            })
            .then((stream) => {
                addVideo(newVideo, stream);

                for (let track of stream.getTracks()) {
                    if (track.kind === "audio") {
                        track.enabled = false;
                    }
                }

                const mic = document.querySelector(".mic");
                mic.addEventListener("click", () => {
                    for (let track of stream.getTracks()) {
                        if (track.kind === "audio") {
                            mic.classList.contains("active")
                                ? (track.enabled = false)
                                : (track.enabled = true);
                        }
                    }
                });

                peer.on("call", (call) => {
                    call.answer(stream);
                    const video = document.createElement("video");

                    call.on("stream", (userVideoStream) => {
                        addVideo(video, userVideoStream);
                    });
                });

                socket.on("new-user", (userId) =>
                    connectNewUser(userId, stream)
                );
            });

        socket.on("disconnect-user", (userId) => {
            peers[userId] && peers[userId].close();
        });

        peer.on("open", (id) => {
            socket.emit("connected", roomId, id);
        });

        function connectNewUser(userId, stream) {
            const call = peer.call(userId, stream);
            const video = document.createElement("video");

            call.on("stream", (userVideoStream) => {
                addVideo(video, userVideoStream);
            });
            call.on("close", () => {
                video.remove();
            });

            peers[userId] = call;
        }

        function addVideo(video, stream) {
            video.srcObject = stream;
            video.addEventListener("loadedmetadata", () => {
                video.play();
            });
        }
    }, [roomId]);

    return (
        <div className="hud w-screen h-screen flex justify-center items-center">
            <iframe
                src="https://varun312.github.io/minet-make-gh/"
                frameborder="0"
                title="MetaVerse"
                className="w-screen h-screen"
            ></iframe>
            <Meter
                setText={setText}
                setWarning={setWarning}
                warning={warning}
            />
            <AnimatePresence>
                {text !== "" && <Subtitle key={1} text={text} />}
                {warningBox && (
                    <Warning
                        setWarningBox={setWarningBox}
                        warning={warning}
                        key={2}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
