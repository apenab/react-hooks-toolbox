import {useState, useEffect} from "react";

import {getDymoUrl, dymoAxios} from "../utils/dymo";


export function useDymoOpenLabel(statusDymoService, labelXML, port = 41951) {
    const [status, setStatus] = useState("init");
    const [label, setLabel] = useState(null);
    useEffect(() => {
        if (statusDymoService === "success") {
            setStatus("loading");
            dymoAxios
                .post(
                    getDymoUrl("RenderLabel", port),
                    `labelXml=${encodeURIComponent(labelXML)}&renderParamsXml=&printerName=`
                )
                .then(response => {
                    setLabel(response.data);
                    setStatus("success");
                })
                .catch(() => {
                    setStatus("error");
                });
        }
    }, [labelXML, port, statusDymoService]);

    return [label, status];
}
