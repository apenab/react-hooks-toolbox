import {useState, useEffect} from "react";

import {getDymoUrl, dymoAxios, getDymoPrintersFromXml} from "../utils/dymo";
import {useAxiosGet} from "../useAxiosGet";


export function useDymoFetchPrinters(statusDymoService, modelPrinter = "LabelWriterPrinter", port = 41951) {
    const [printers, setPrinters] = useState([]);
    const {status, response} = useAxiosGet({
        url: getDymoUrl("GetPrinters", port),
        axiosInstance: dymoAxios,
        onlyDispatchIf: statusDymoService === "success"
    });

    useEffect(() => {
        if (response) {
            setPrinters(getDymoPrintersFromXml(response, modelPrinter));
        }
    }, [modelPrinter, response]);

    return {statusDymoFetchPrinters: status, printers: printers};
}
