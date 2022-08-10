import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { dataProcessor } from "../helpers/dataProcessor";

const WORKER_URL = import.meta.env.VITE_WORKER_URL;
// VITE_WORKER_URL should be like: <workerurl>/v1/page/

function getData(slug) {
    const url =  `${WORKER_URL}${slug}`;
    return axios.get(url).then(res=>res.data);
   }

function BlogContent({slug}){
    const [Content, setContent] = useState([]);
    const isContentEmpty = Content.length === 0;
    const blogQuery = useQuery(["page", slug], ()=>getData(slug)
    );
    if (blogQuery.isLoading){
        return <h2>Loading...</h2>;
    }
    else if (blogQuery.isError){
        return <h2>Error</h2>;
    }
    const data = blogQuery.data;
    if (isContentEmpty){
    setContent(dataProcessor(data));
    }
    return (
        Content.map((item)=>{
            return (
                <div>
                    {item.type === "title" ?
                    <>
                    <h2>{item.content}</h2>
                    <br></br>
                    </>
                    :null}
                    {item.type === "text" ? <p>{item.content}</p>: null}
                    {item.type === "image" ? <img src={item.content} alt="notion-image" /> : null}
                    {item.type === "bulleted-list" ? <li>{item.content}</li>: null}
                </div>
            )
        }
        )
    )
}

export default function Blog() {
    const {slug} = useParams();
    return (
        <>
        <section>
        <BlogContent slug={slug} />
        </section>
        </>
    );
};
