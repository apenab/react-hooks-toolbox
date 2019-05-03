import {getDymoUrl, dymoAxios} from "../utils/dymo";
import {useAxiosGet} from "../useAxiosGet";


export function useDymoCheckService(port = 41951) {
    const {status} = useAxiosGet({url: getDymoUrl("StatusConnected", port), axiosInstance: dymoAxios});
    return status;
}
