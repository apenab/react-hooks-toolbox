import React from "react";
import {render} from "react-dom";

import GoogleAPIExample from "./components/GoogleAPIExample";
import DymoAPIExample from "./components/DymoAPIExample";
import AxiosAPIExample from "./components/AxiosAPIExample";


class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: ""
        };
    }

    render() {
        return (
            <div>
                <div style={{display: "inline-table", width: "30%"}}>
                    <button onClick={() => this.setState({show: "google_example"})}>
                        Mount Google API component example
                    </button>
                    <br/>
                    {this.state.show === "google_example" && <GoogleAPIExample/>}
                </div>
                <div style={{display: "inline-table", width: "30%"}}>
                    <button onClick={() => this.setState({show: "dymo_example"})}>
                        Mount DYMO API component example
                    </button>
                    <br/>
                    {this.state.show === "dymo_example" && <DymoAPIExample/>}
                </div>
                <div style={{display: "inline-table", width: "30%"}}>
                    <button onClick={() => this.setState({show: "axios_example"})}>
                        Mount AXIOS API component example
                    </button>
                    <br/>
                    {this.state.show === "axios_example" && <AxiosAPIExample/>}
                </div>
            </div>
        );
    }
}

render(<Demo/>, document.querySelector("#demo"));
