import { useState } from "react";
import Redirect from "./Redirect";

const Index = ({ verified }) => {
    const [redirect, setRedirect] = useState(false);

    return (
        <>
            <img src="/assets/Design.png" alt="the" />
            <section className="index-section w-full py-36 flex flex-col justify-center relative items-center">
                <h1 className="text-5xl text-white mb-16 font-medium">
                    Ready to start your MetaJourney?
                </h1>
                <button
                    className="btn !bg-blue-600 !border-blue-700 scale-150"
                    onClick={() => setRedirect(true)}
                >
                    Get started
                </button>

                {redirect && <Redirect verified={verified} />}
            </section>
        </>
    );
};

export default Index;
