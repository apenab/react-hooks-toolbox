import React, {useEffect, useState} from "react";
import {render} from "react-dom";

import {useGoogleApiInit} from "../../src/hooks";


const config = require("../../api_google.config.json");


function GoogleAPITest() {
    const gapiObject = useGoogleApiInit(config);
    useEffect(() => {
        console.log(gapiObject);
    });
    function handleSignIn() {
        window["gapi"].auth2.getAuthInstance().signIn();
    }
    function handleSignOut() {
        window["gapi"].auth2.getAuthInstance().signOut();
    }
    return (
        <div>
            <h1>Mounted Google API Object</h1>
            <button onClick={() => handleSignIn()}>Sign in</button>
            <button onClick={() => handleSignOut()}>Sign out</button>
        </div>
    );
}

function Demo() {
    const [show, setShow] = useState("");

    return (
        <div>
            {show === "google_api" && <GoogleAPITest/>}
            <button onClick={() => setShow("google_api")}>Mount Google API test component</button>
        </div>
    );
}

render(<Demo/>, document.querySelector("#demo"));
