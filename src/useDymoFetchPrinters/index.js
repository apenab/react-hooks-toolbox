import {useState, useEffect} from "react";

import {getDymoUrl, dymoAxios, getDymoPrintersFromXml} from "../utils/dymo";


export function useDymoFetchPrinters(statusDymoService, port = 41951) {
    const [printers, setPrinters] = useState([]);
    const [status, setStatus] = useState("init");
    useEffect(() => {
        if (statusDymoService === "success") {
            setStatus("loading");
            dymoAxios
                .get(getDymoUrl("GetPrinters", port))
                .then(response => {
                    const data = response.data;
                    setPrinters(getDymoPrintersFromXml(data));
                    setStatus("success");
                })
                .catch(() => {
                    setStatus("error");
                });
        }
    }, [port, statusDymoService]);

    return [printers, status];
}
