import {useRef, useState, useEffect} from "react";


export function useDebounce(data, delay) {
    const handler = useRef();
    const [value, setValue] = useState(data);
    let optionsString;
    try {
        optionsString = JSON.stringify(data);
    }
    catch (err) {}

    useEffect(() => {
        handler.current = setTimeout(() => {
            setValue(data);
        }, delay);

        return () => {
            clearTimeout(handler.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionsString, delay]);

    return value;
}
