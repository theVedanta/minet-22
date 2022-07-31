import { motion } from "framer-motion";

const Subtitle = ({ text }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.6,
                delay: 0.2,
            }}
            key={1}
            className="subtitle absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-4 rounded-xl"
        >
            <h2 className="text-xl">{text}</h2>
        </motion.div>
    );
};

export default Subtitle;
