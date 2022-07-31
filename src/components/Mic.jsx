import { useState } from "react";
import { FaMicrophoneAlt, FaMicrophoneAltSlash } from "react-icons/fa";
import Filter from "bad-words";

const Mic = ({ setText, setWarning, warning, audioEnable }) => {
    const filter = new Filter();
    filter.addWords("kabir");
    const [mic, setMic] = useState(false);

    // const recognize = () => {
    //     window.SpeechRecognition =
    //         window.SpeechRecognition || window.webkitSpeechRecognition;
    //     const rec = new window.SpeechRecognition();
    //     rec.interimResults = true;

    //     if (!mic) {
    //         rec.addEventListener("result", (e) => {
    //             const spoken = Array.from(e.results)
    //                 .map((result) => result[0])
    //                 .map((result) => result.transcript)
    //                 .join("");

    //             const cleaned = filter.clean(spoken);
    //             if (cleaned.includes("*")) {
    //                 setText("");
    //                 setWarning(warning + 1);
    //             } else {
    //                 setText(cleaned);
    //             }
    //         });
    //         rec.start();

    //         rec.addEventListener("end", (e) => {
    //             setMic(false);
    //             audioEnable(false);
    //             setTimeout(() => setText(""), 5000);
    //         });
    //     } else {
    //         rec.stop();
    //         setTimeout(() => setText(""), 5000);
    //         setMic(false);
    //         audioEnable(false);
    //     }
    // };

    return (
        <>
            <button
                onClick={() => {
                    audioEnable(!mic);
                    setMic(!mic);
                    // recognize();
                }}
                className="mic text-2xl w-12 h-12 rounded-full border-2 border-black flex items-center justify-center transition-all cursor-pointer active:scale-90"
            >
                {mic ? <FaMicrophoneAlt /> : <FaMicrophoneAltSlash />}
            </button>
        </>
    );
};

export default Mic;
