import { useState } from "react";
import Redirect from "./Redirect";

const Index = ({ verified }) => {
    const [redirect, setRedirect] = useState(false);

    return (
        <>
            <img src="/assets/Design.png" alt="the" />
            <section className="index-section w-full py-80 flex flex-col justify-center relative items-end">
                <video
                    autoPlay
                    muted
                    loop
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src="/assets/vr.mp4" />
                </video>
                <div className="start-journey z-30 w-1/3">
                    <h1 className="text-5xl text-white mb-10 pr-10 font-medium leading-normal">
                        Ready to start your Journey?
                    </h1>
                    <button className="btn" onClick={() => setRedirect(true)}>
                        Get started
                    </button>
                </div>

                {redirect && <Redirect verified={verified} />}
            </section>
        </>
    );
};

export default Index;
