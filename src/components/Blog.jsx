import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NOTION_URL = import.meta.env.VITE_WORKER_URL;
const NOTION_BASE = Import.meta.env.VITE_BASE_URL;
// VITE_WORKER_URL should be like: <workerurl>/v1/page/
// VITE_BASE_URL should be your public Notion url

function getData(slug) {
    const url =  `${NOTION_URL}${slug}`;
    return axios.get(url).then(res=>res.data);
   }


function genImgURL(item){
    let url = item["value"]["properties"]["source"][0][0];
    const blockId = item["value"]["id"];
    const spaceId = item["value"]["space_id"];
    url = ((url.replace(/:/g, "%3A")).replace(/\//g, "%2F"));
    const secureTrail = "?table=block&id=" + blockId + "&spaceId=" + spaceId;
    url = `${NOTION_BASE}image/${url}${secureTrail}`;
    return url;
}

function getTitle(item){
    console.log(item["value"]["properties"]["title"][0][0]);
    return item["value"]["properties"]["title"][0][0];
}

function BlogContent({slug}){
    const [Content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isContentEmpty = Content.length === 0;
    const notion = [];
    useEffect(()=>{
        if(isContentEmpty){
            getData(slug).then(data => {
                const dataMap = new Map(Object.entries(data));
                const dataList = Array.from(dataMap.values());
                const title = getTitle(dataList[0]);
                notion.push({
                    content: title,
                    type: "title",
                    key: "title"
                });
                for (const item of dataList) {
                    try{
                    if (item["value"]["type"] === "text"){
                        if (item["value"]["properties"]["title"].length > 0){
                            let text = item["value"]["properties"]["title"].reduce((acc, cur)=>{
                                return acc + cur[0];
                            }
                            , "");
                            notion.push({
                                content: text,
                                type: "text",
                                key: item["value"]["id"]
                            });
                        }
                        else{
                        for (const title of item["value"]["properties"]["title"]){
                            notion.push({
                                content: title[0],
                                type: "text",
                                key: item["value"]["id"]
                            });
                        }
                    }
                }
                if (item["value"]["type"] === "image"){
                    notion.push({
                        content: genImgURL(item),
                        type: "image",
                        key: item["value"]["id"]
                    });
                }
                if (item["value"]["type"] === "bulleted_list"){
                    notion.push({
                        content: item["value"]["properties"]["title"][0][0],
                        type: "bulleted-list",
                        key: item["value"]["id"]
                    });
                }
            }
                    catch(err){
                        notion.push({
                            content: "",
                            key: item["value"]["id"]
                        });
                    }};
                setContent(notion);
                setIsLoading(false);
            });
        }});
        return (
            <div>
                {isLoading ? <h2>loading...</h2>:
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
                )}
            </div>
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

