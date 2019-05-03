import {useReducer, useEffect, useRef, useState} from "react";
import axios from "axios";

import {init, reducer} from "./reducer";
import {fetch_start, fetch_success, fetch_failure} from "./actions";


export function useAxios({
    url,
    method,
    options = {},
    controlledFetch = false,
    axiosInstance = axios,
    successCb = () => {},
    failedCb = () => {},
    onlyDispatchIf = true
}) {
    const [state, dispatch] = useReducer(reducer, init);
    const [innerTrigger, setInnerTrigger] = useState(null);
    const cancelToken = useRef();

    let optionsString;
    try {
        optionsString = JSON.stringify(options);
    }
    catch (err) {}

    const deps = controlledFetch ? [innerTrigger] : [method, optionsString, url, onlyDispatchIf];

    useEffect(() => {
        if (!onlyDispatchIf) {
            return;
        }
        if (!innerTrigger && controlledFetch) {
            return;
        }
        const fetchData = async () => {
            dispatch(fetch_start());
            if (cancelToken.current) {
                cancelToken.current.cancel();
            }
            cancelToken.current = axios.CancelToken.source();
            try {
                const optionsObj = JSON.parse(optionsString);
                const results = await axiosInstance.request({
                    url,
                    method,
                    cancelToken: cancelToken.current.token,
                    ...optionsObj
                });
                successCb(results.data);
                dispatch(fetch_success(results.data));
            }
            catch (error) {
                failedCb(error);
                if (!axios.isCancel(error)) {
                    dispatch(fetch_failure(error));
                }
            }
        };
        fetchData();
        return function cleanup() {
            if (cancelToken.current) {
                cancelToken.current.cancel();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return {
        ...state,
        dispatchFetch: () => {
            setInnerTrigger(+new Date());
        }
    };
}
