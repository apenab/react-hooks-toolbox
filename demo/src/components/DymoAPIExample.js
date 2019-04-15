import React from "react";

import {useDymoCheckService, useDymoFetchPrinters} from "../../../src";


export default function DymoAPIExample() {
    const [msg, statusDymoService] = useDymoCheckService();
    const [printers, statusDymoLoadPrinters] = useDymoFetchPrinters(statusDymoService);

    if (statusDymoService === "loading") {
        return <h1>Checking DYMO service...</h1>;
    }
    else if (statusDymoService === "error") {
        return <h1 style={{color: "red"}}>{msg}</h1>;
    }
    else if (statusDymoService === "success") {
        return (
            <div>
                <h3 style={{color: "green"}}>DYMO service is running in your PC.</h3>
                {statusDymoLoadPrinters === "loading" && <h4>Loading printers..</h4>}
                {statusDymoLoadPrinters === "success" && (
                    <React.Fragment>
                        <h4>Printers:</h4>
                        <ul>
                            {printers.map(printer => (
                                <li key={printer.name}>{printer.name}</li>
                            ))}
                        </ul>
                    </React.Fragment>
                )}
            </div>
        );
    }
    else {
        return null;
    }
}
