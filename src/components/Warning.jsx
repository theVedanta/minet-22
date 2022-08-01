import { motion } from "framer-motion";
import { useClickOutside } from "react-haiku";
import { useRef } from "react";

const Warning = ({ setWarningBox, warning }) => {
    const ref = useRef(null);
    useClickOutside(ref, () => setWarningBox(false));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.2,
            }}
            key={2}
            className="warn-screen w-screen h-screen fixed top-0 left-0 z-40 flex justify-center items-center"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(40px)",
            }}
        >
            <div
                ref={ref}
                className="warn-box w-1/3 bg-white px-10 py-8 rounded-xl shadow-xl"
            >
                <h1 className="text-2xl font-medium mb-4">
                    {warning > 0
                        ? "Warning: Do not use abusive language."
                        : "Warning: Prolonged exposure to VR"}
                </h1>
                <p className="text-lg font-light mb-8">
                    {warning > 0 ? (
                        <>
                            Using abusive words is a violation of the
                            VERSHIELD&trade; community guidelines. Should this
                            happen again, you will be disconnected from the
                            servers.
                        </>
                    ) : (
                        <>
                            Being in the virtual world for long periods of time
                            can affect your health and mental well-being,
                            VERSHIELD&trade; protects you from these problems.
                        </>
                    )}
                </p>

                <button onClick={() => setWarningBox(false)} className="btn">
                    I understand
                </button>
            </div>
        </motion.div>
    );
};

export default Warning;
