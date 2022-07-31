import synonyms from "synonyms";
import notyf from "../notyf";

const Verify = ({ setVerified }) => {
    const videos = [
        {
            vid: "/assets/vid1.mp4",
            ans1: "angry",
            ans2: "calm",
        },
        // {
        //     vid: "/assets/vid2.mp4",
        //     ans1: "happy",
        //     ans2: "sad",
        // },
    ];
    const video = videos[Math.floor(Math.random() * videos.length)];

    let score = 0;

    const removeSpace = (e) => {
        e.target.value.split("").pop() === " "
            ? (e.target.value = e.target.value.slice(0, -1)).trim()
            : console.log("no spaces allowed");
    };

    const submit = (e) => {
        e.preventDefault();

        const vid = document.querySelector(
            ".ques input[name='vid-ques']"
        ).value;
        const aud = document.querySelector(
            ".ques input[name='aud-ques']"
        ).value;

        let vidSyns = synonyms(video.ans1);
        vidSyns = vidSyns.n ? vidSyns.n : vidSyns.s ? vidSyns.s : vidSyns.v;
        let audSyns = synonyms(video.ans2);
        audSyns = audSyns.n ? audSyns.n : audSyns.s ? audSyns.s : audSyns.v;

        for (let vidSyn of vidSyns) {
            if (vid === vidSyn) {
                score += 1;
            }
        }
        for (let audSyn of audSyns) {
            if (aud === audSyn) {
                score += 1;
            }
        }

        if (score >= 1) {
            notyf.success("Verified");
            localStorage.setItem("verified", "true");
            setVerified(true);
            window.location.href = "/";
        } else {
            notyf.error("Verification failed");
        }
    };

    return (
        <div className="verification-screen w-screen h-screen flex justify-center items-center">
            <form
                onSubmit={(eve) => submit(eve)}
                className="verification-form w-1/3 bg-white px-10 py-10 rounded-2xl shadow-2xl"
            >
                <h1 className="text-3xl font-semibold mb-12">
                    Human verification
                </h1>
                <div className="video mb-10">
                    <video controls className="rounded-xl object-cover">
                        <source src={video.vid} type="video/mp4" />
                    </video>
                </div>
                <div className="ques">
                    <div className="input mb-4">
                        <label htmlFor="vid-ques">
                            What emotion does the VIDEO show?
                        </label>
                        <input
                            type="text"
                            name="vid-ques"
                            id="vid-ques"
                            placeholder="Your answer (20 chars max.)"
                            onChange={(eve) => removeSpace(eve)}
                            maxLength={20}
                            required
                            autoComplete="off"
                        />
                    </div>

                    <div className="input">
                        <label htmlFor="aud-ques">
                            What emotion does the AUDIO show?
                        </label>
                        <input
                            type="text"
                            name="aud-ques"
                            id="aud-ques"
                            placeholder="Your answer (20 chars max.)"
                            onChange={(eve) => removeSpace(eve)}
                            maxLength={20}
                            required
                            autoComplete="off"
                        />
                    </div>
                </div>

                <button type="submit" className="btn w-full mt-10">
                    Verify
                </button>
            </form>
        </div>
    );
};

export default Verify;