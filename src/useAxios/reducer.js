import produce from "immer";


export const init = {status: "init", response: null, error: null};

export function reducer(state, action) {
    switch (action.type) {
    case "FETCH_START":
        return produce(state, draftState => {
            draftState.status = "loading";
            draftState.error = null;
            draftState.response = null;
        });
    case "FETCH_SUCCESS":
        return produce(state, draftState => {
            draftState.status = "success";
            draftState.error = null;
            draftState.response = action.payload;
        });
    case "FETCH_FAILURE":
        return produce(state, draftState => {
            draftState.status = "error";
            draftState.error = action.error;
            draftState.response = null;
        });
    default:
        break;
    }
}
