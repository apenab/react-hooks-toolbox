import {getDymoUrl, dymoAxios} from "../utils/dymo";
import {useAxiosPost} from "../useAxiosPost";


export function useDymoOpenLabel(statusDymoService, labelXML, port = 41951) {
    const {status, response, error} = useAxiosPost({
        url: getDymoUrl("RenderLabel", port),
        options: {data: `labelXml=${encodeURIComponent(labelXML)}&renderParamsXml=&printerName=`},
        axiosInstance: dymoAxios,
        onlyDispatchIf: statusDymoService === "success",
        delay: 500
    });
    return {label: response, statusOpenLabel: status, errorOpenLabel: error};
}
