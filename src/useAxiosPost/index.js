import {useAxios} from "../index";

import {useDebounce} from "../useDebounce";


export function useAxiosPost({
    url = "",
    options = {},
    controlledFetch,
    delay = 0,
    axiosInstance,
    successCb,
    failedCb,
    onlyDispatchIf
}) {
    const debounceProps = useDebounce({url, method: "POST", options, controlledFetch, onlyDispatchIf}, delay);
    const state = useAxios({...debounceProps, axiosInstance, successCb, failedCb});

    return state;
}
