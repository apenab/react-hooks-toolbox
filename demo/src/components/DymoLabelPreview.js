import React, {memo} from "react";

import {useDymoOpenLabel} from "../../../src";


const DymoLabelPreview = memo(({xml, statusDymoService, loadingComponent, errorComponent}) => {
    const {label, statusOpenLabel} = useDymoOpenLabel(statusDymoService, xml);
    const style = {background: "hsla(0, 0%, 50%, 0.66)", padding: 7};
    if (statusOpenLabel === "loading") {
        return loadingComponent;
    }
    else if (statusOpenLabel === "error") {
        return errorComponent;
    }
    else if (statusOpenLabel === "success") {
        return (
            <React.Fragment>
                <img src={"data:image/png;base64," + label} alt="dymo label preview" style={style}/>
            </React.Fragment>
        );
    }
});

export default DymoLabelPreview;
