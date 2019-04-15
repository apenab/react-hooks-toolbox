import axios from "axios";
import XMLParser from "react-xml-parser";


export function getDymoUrl(typeDymoFunction, port = 41951) {
    return `https://127.0.0.1:${port}/DYMO/DLS/Printing/${typeDymoFunction}`;
}

export const dymoAxios = axios.create({
    transformRequest: [
        (data, headers) => {
            delete headers.common;
            return data;
        }
    ]
});

// Converts the XML response thrown by the dymo service for GetPrinters in a object with the following structure
// Only return the printers type => "LabelWriterPrinters"
//   {
//      name: "",
//      modelName: "",
//      isLocal: "",
//      isTwinTurbo: "",
//      isConnected: "",
//   }
//
export function getDymoPrintersFromXml(xml) {
    const xmlParse = new XMLParser().parseFromString(xml),
        labelWritersPrinters = xmlParse.getElementsByTagName("LabelWriterPrinter");
    var printers = [];
    labelWritersPrinters.map(printer => {
        let printerDetails = {};
        printer.children.map(item => {
            printerDetails[item["name"].charAt(0).toLowerCase() + item["name"].slice(1)] = item.value;
        });
        printers.push(printerDetails);
    });
    return printers;
}
