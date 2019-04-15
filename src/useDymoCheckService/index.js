import {useState, useEffect} from "react";
import {getDymoUrl, dymoAxios} from "../utils/dymo";


export function useDymoCheckService(port = 41951) {
    const [status, setStatus] = useState("init");
    const [message, setMessage] = useState("");
    useEffect(() => {
        setStatus("loading");
        dymoAxios
            .get(getDymoUrl("StatusConnected", port))
            .then(() => {
                setStatus("success");
            })
            .catch(() => {
                setStatus("error");
                setMessage("Web service is not running in your computer");
            });
    }, [port]);

    return [message, status];
}
