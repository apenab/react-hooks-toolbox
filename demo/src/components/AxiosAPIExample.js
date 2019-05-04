import React, {useState, useReducer, useContext, createContext} from "react";
import produce from "immer";

import {useAxiosGet, useAxiosPost, useAxios} from "../../../src";


const Context = createContext();

function ListPosts() {
    const {state, dispatch} = useContext(Context);
    const [postId, setPostId] = useState(null);
    const {status} = useAxiosGet({
        url: "http://localhost:3001/posts",
        successCb: response => {
            dispatch({type: "FETCHED_POSTS", payload: response});
        }
    });
    const {dispatchFetch} = useAxios({
        url: `http://localhost:3001/posts/${postId}`,
        method: "DELETE",
        controlledFetch: true
    });
    if (status === "loading") {
        return <h5>Loading posts...</h5>;
    }
    else if (status === "error") {
        return <h5 style={{color: "red"}}>Error in loading posts</h5>;
    }

    function handleDeletePost(post) {
        setPostId(post.id);
        dispatchFetch();
        dispatch({type: "DELETED_POST", id: post.id});
    }

    return (
        <ul>
            {state.posts.map(post => (
                <li key={post.id}>
                    {post.title} by <strong>{post.author}</strong>{" "}
                    <a href="javascript:void(0)" onClick={() => handleDeletePost(post)}>
                        Delete Post
                    </a>
                </li>
            ))}
        </ul>
    );
}

function AddPost() {
    const {dispatch} = useContext(Context);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const {dispatchFetch, status} = useAxiosPost({
        url: "http://localhost:3001/posts",
        controlledFetch: true,
        options: {
            data: {
                title: title,
                author: author
            }
        },
        successCb: response => {
            dispatch({type: "ADD_POST", payload: response});
        }
    });

    const loading = status === "loading";
    return (
        <div>
            <input value={title} onChange={e => setTitle(e.target.value)} disabled={loading}/>
            <input value={author} onChange={e => setAuthor(e.target.value)} disabled={loading}/>
            <button onClick={() => dispatchFetch()} disabled={loading}>
                {loading ? "Loading..." : "Add Post"}
            </button>
        </div>
    );
}

const initState = {posts: []};

function reducer(state, action) {
    switch (action.type) {
    case "ADD_POST":
        return produce(state, draftState => {
            draftState.posts.push(action.payload);
        });
    case "FETCHED_POSTS":
        return produce(state, draftState => {
            draftState.posts = action.payload;
        });
    case "DELETED_POST":
        return produce(state, draftState => {
            const {posts} = state,
                index = posts.findIndex(post => post["id"] === action.id);
            draftState.posts.splice(index, 1);
        });
    default:
        return state;
    }
}

export default function AxiosAPIExample(props) {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <Context.Provider value={{state, dispatch}}>
            <ListPosts/>
            <AddPost/>
        </Context.Provider>
    );
}
