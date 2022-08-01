import { useState } from "react";
import {
    FaMicrophoneAlt,
    FaMicrophoneAltSlash,
    FaVolumeOff,
    FaVolumeUp,
} from "react-icons/fa";
import Filter from "bad-words";

const Mic = ({ setText, setWarning, warning }) => {
    const filter = new Filter();
    filter.addWords("kabir");
    const [mic, setMic] = useState(false);
    const [mic2, setMic2] = useState(false);

    const recognize = () => {
        window.SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new window.SpeechRecognition();
        rec.interimResults = true;

        if (!mic2) {
            rec.addEventListener("result", (e) => {
                const spoken = Array.from(e.results)
                    .map((result) => result[0])
                    .map((result) => result.transcript)
                    .join("");

                const cleaned = filter.clean(spoken);
                if (cleaned.includes("*")) {
                    setText("");
                    setWarning(warning + 1);
                } else {
                    setText(cleaned);
                }
            });
            rec.start();

            rec.addEventListener("end", (e) => {
                setMic2(false);
                setTimeout(() => setText(""), 5000);
            });
        } else {
            rec.stop();
            setTimeout(() => setText(""), 5000);
            setMic2(false);
        }
    };

    return (
        <>
            <button
                onClick={() => {
                    setMic(!mic);
                }}
                className={`mic text-2xl w-12 h-12 rounded-full border-2 border-black flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
                    mic ? "active" : ""
                }`}
            >
                {mic ? <FaMicrophoneAlt /> : <FaMicrophoneAltSlash />}
            </button>

            <button
                onClick={() => {
                    setMic2(!mic2);
                    recognize();
                }}
                className={`mic2 text-2xl w-12 h-12 rounded-full border-2 border-black text-black fixed flex bottom-3 right-3 items-center justify-center transition-all cursor-pointer active:scale-90 ${
                    mic2 ? "active" : ""
                }`}
            >
                {mic2 ? <FaVolumeUp /> : <FaVolumeOff />}
            </button>
        </>
    );
};

export default Mic;
