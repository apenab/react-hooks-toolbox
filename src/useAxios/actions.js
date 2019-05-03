export const fetch_start = () => ({type: "FETCH_START"});
export const fetch_success = data => ({
    type: "FETCH_SUCCESS",
    payload: data
});
export const fetch_failure = error => ({type: "FETCH_FAILURE", error});
