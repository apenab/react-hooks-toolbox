import React from "react";

import {useAxiosGet} from "../../../src";


function ListPosts() {
    const {status, response} = useAxiosGet({
        url: "http://localhost:3001/posts"
    });
    if (status === "loading") {
        return <h5>Loading posts...</h5>;
    }
    else if (status === "error") {
        return <h5>Error in loading posts.</h5>;
    }
    else if (status === "success") {
        return (
            <ul>
                {" "}
                {response.map(item => (
                    <li key={item.id}>
                        {item.title}, {item.author}
                    </li>
                ))}{" "}
            </ul>
        );
    }
    else {
        return null;
    }
}

export default function AxiosAPIExample(props) {
    return (
        <div>
            <ListPosts/>
        </div>
    );
}
