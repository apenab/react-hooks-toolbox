import {useAxios} from "../index";

import {useDebounce} from "../useDebounce";


export function useAxiosGet({
    url = "",
    options = {},
    controlledFetch,
    delay = 0,
    axiosInstance,
    onlyDispatchIf,
    successCb,
    failedCb
}) {
    const debounceProps = useDebounce({url, method: "GET", options, controlledFetch, onlyDispatchIf}, delay);
    const state = useAxios({...debounceProps, axiosInstance, successCb, failedCb});

    return state;
}
