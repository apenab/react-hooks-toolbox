import React, {useState, useMemo} from "react";

import {useDymoCheckService, useDymoFetchPrinters} from "../../../src";
import {generateXmlExample} from "../../../src/utils/dymo";
import DymoLabelPreview from "./DymoLabelPreview";


export default function DymoAPIExample() {
    const statusDymoService = useDymoCheckService();
    const [name, setName] = useState("Antonio Peña Batista");
    const [address, setAddress] = useState("Headquarters 1120 N Street Sacramento");
    const {statusDymoFetchPrinters, printers} = useDymoFetchPrinters(statusDymoService);

    const xmlMemo = useMemo(() => generateXmlExample(name, address), [address, name]);
    return (
        <div>
            {statusDymoService !== "success" ? (
                <h1>Checking DYMO service...</h1>
            ) : (
                <React.Fragment>
                    <h3 style={{color: "green"}}>DYMO service is running in your PC.</h3>
                    <input value={name} title="Name" onChange={e => setName(e.target.value)}/>
                    <br/>
                    <br/>
                    <input value={address} title="Address" onChange={e => setAddress(e.target.value)}/>
                    <br/>
                    <br/>
                </React.Fragment>
            )}
            <DymoLabelPreview
                xml={xmlMemo}
                statusDymoService={statusDymoService}
                loadingComponent={<h4>Loading Preview...</h4>}
                errorComponent={<h4>Error..</h4>}/>
            {statusDymoFetchPrinters === "loading" && <h4>Loading printers..</h4>}
            {statusDymoFetchPrinters === "success" && (
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
