import {useEffect, useCallback, useReducer} from "react";

import {change_gapi_status, change_signed_status} from "./actions";
import {reducer} from "./reducers";


const initState = {gapiStatus: "init", gapiError: null, signed: false, userProfile: null};

export function useGoogleApiInit(initConf) {
    const [state, dispatch] = useReducer(reducer, initState);

    const handleInit = useCallback(() => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        document.body.appendChild(script);
        script.onerror = () => {
            dispatch(change_gapi_status("error", "Failed to load api.js script. "));
        };
        script.onload = () => {
            const gapi = window["gapi"];
            gapi.load("client:auth2", {
                callback: () => {
                    // Handle gapi.client initialization.
                    gapi.client.init(initConf).then(
                        () => {
                            dispatch(change_gapi_status("success"));
                            // Listen for sign-in state changes.
                            gapi.auth2
                                .getAuthInstance()
                                .isSignedIn.listen(signed => dispatch(change_signed_status(signed)));
                            // Handle the initial sign-in state.
                            dispatch(change_signed_status(gapi.auth2.getAuthInstance().isSignedIn.get()));
                        },
                        error => {
                            dispatch(change_gapi_status("error", error));
                        }
                    );
                },
                onerror: error => {
                    // Handle loading gapiError.
                    dispatch(change_gapi_status("error", error));
                }
            });
        };
    }, [initConf]);

    useEffect(() => {
        dispatch(change_gapi_status("loading"));
        handleInit();
    }, [handleInit]);

    return state;
}
