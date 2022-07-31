import { v4 } from "uuid";
import { useEffect } from "react";

const Redirect = ({ verified }) => {
    useEffect(() => {
        !verified
            ? (window.location.href = "/verify")
            : (window.location.href = `/${v4()}`);
    }, [verified]);

    return <></>;
};
export default Redirect;
