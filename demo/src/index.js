import React from "react";
import {render} from "react-dom";

import GoogleAPIExample from "./components/GoogleAPIExample";
import DymoAPIExample from "./components/DymoAPIExample";


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
            </div>
        );
    }
}

render(<Demo/>, document.querySelector("#demo"));
