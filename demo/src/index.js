import React, {useEffect, useState} from "react";
import {render} from "react-dom";
import {useGoogleApiInit} from "../../src";


const config = require("../../api_google.config.json");


function GoogleAPITest() {
    const gapiObject = useGoogleApiInit(config);
    const {gapiStatus, signed} = gapiObject;
    useEffect(() => {
        console.log(gapiObject);
    });
    function handleSignIn() {
        window["gapi"].auth2.getAuthInstance().signIn();
    }
    function handleSignOut() {
        window["gapi"].auth2.getAuthInstance().signOut();
    }
    if (gapiStatus === "loading") {
        return <h1>Loading...</h1>;
    }
    else if (gapiStatus === "success") {
        return (
            <div>
                <h1 style={{color: "blue"}}>Google API is ready!!</h1>
                <br/>
                {signed ? (
                    <button onClick={() => handleSignOut()}>Sign out</button>
                ) : (
                    <button onClick={() => handleSignIn()}>Sign in</button>
                )}
            </div>
        );
    }
    else {
        return <h1 style={{color: "red"}}>Error!!</h1>;
    }
}

function Demo() {
    const [show, setShow] = useState("");

    return (
        <div>
            {show === "google_api" && <GoogleAPITest/>}
            <button onClick={() => setShow("google_api")}>Mount Google API component</button>
        </div>
    );
}

render(<Demo/>, document.querySelector("#demo"));
