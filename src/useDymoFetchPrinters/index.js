import {useState, useEffect} from "react";

import {getDymoUrl, dymoAxios, getDymoPrintersFromXml} from "../utils/dymo";
import {useAxiosGet} from "../useAxiosGet";


export function useDymoFetchPrinters(statusDymoService, modelPrinter = "LabelWriterPrinter", port = 41951) {
    const [printers, setPrinters] = useState([]);
    const [innerStatus, setInnerStatus] = useState("init");
    const {status, response} = useAxiosGet({
        url: getDymoUrl("GetPrinters", port),
        axiosInstance: dymoAxios,
        onlyDispatchIf: statusDymoService === "success"
    });

    useEffect(() => {
        if (status === "success" && response) {
            setPrinters(getDymoPrintersFromXml(response, modelPrinter));
            setInnerStatus(status);
        }
        else {
            setInnerStatus(status);
        }
    }, [modelPrinter, response, status]);

    return {statusDymoFetchPrinters: innerStatus, printers: printers};
}
