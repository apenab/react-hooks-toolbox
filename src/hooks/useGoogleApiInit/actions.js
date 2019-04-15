export function change_signed_status(signed) {
    return {type: "CHANGE_SIGNED_STATUS", signed};
}

export function change_gapi_status(status, error = null) {
    return {type: "CHANGE_GAPI_STATUS", status, error};
}
