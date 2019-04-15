import {createProfileObject} from "./utils";
import produce from "immer";


export function reducer(state, action) {
    switch (action.type) {
    case "CHANGE_SIGNED_STATUS":
        const signed = action.signed;
        let basicProfileUserSigned = null;
        if (signed) {
            const gapi = window["gapi"],
                GoogleAuth = gapi.auth2.getAuthInstance(),
                currentUser = GoogleAuth.currentUser.get(),
                profile = currentUser.getBasicProfile(),
                token = currentUser.getAuthResponse().id_token;
            basicProfileUserSigned = createProfileObject(
                profile.getId(),
                profile.getName(),
                profile.getGivenName(),
                profile.getFamilyName(),
                profile.getImageUrl(),
                profile.getEmail(),
                token
            );
        }
        return produce(state, draftState => {
            draftState.signed = signed;
            draftState.userProfile = basicProfileUserSigned;
        });
    case "CHANGE_GAPI_STATUS":
        return produce(state, draftState => {
            draftState.gapiStatus = action.status;
            draftState.gapiError = action.error;
        });
    default:
        return state;
    }
}
