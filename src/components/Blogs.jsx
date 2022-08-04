import React from "react";
import { useState, useEffect } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import Blog from "./Blog";
import axios from "axios";

const NOTION_URL = import.meta.env.VITE_NOTION_URL;
const NOTION_BASE = import.meta.env.VITE_NOTION_BASE;
function getData(url) {
    return axios.get(url).then(res => res)
   }

function genURL(item){
    let title = item["value"]["properties"]["title"][0][0];
    // strip ;,:,/""'? from title, replace with -
    title = title.replace(/[;,:,\/"'?]/g, "-");
    let slugId = item["value"]["id"];
    // remove hyphens from slugId
    slugId = slugId.replace(/-/g, "");
    // if (isPage) {
        return `${NOTION_BASE}${title}-${slugId}`;
    //}else {
    //    return `https://blog.arthtyagi.xyz/#${slugId}`;}
};



function BlogList(){
    const [notionContent, setNotionContent] = useState([]);
    // replace notionContent with useReducer instead of useState
    const [isLoading, setIsLoading] = useState(true);
    const isnotionContentEmpty = notionContent.length === 0;
    const notion = [];
    useEffect(()=>{
        if(isnotionContentEmpty){
            getData(NOTION_URL).then(data => {
                const dataMap = new Map(Object.entries(data.data));
                const dataList = Array.from(dataMap.values());
                for (const item of dataList) {
                    try{
                    // 629... is the pageId of my base page
                    if (item["value"]["type"] === "page" && item["value"]["id"] !== "629c6203-1af3-4bf3-b5dc-2335730153f4"){
                    notion.push({
                        title: item["value"]["properties"]["title"][0][0],
                        url: genURL(item),
                        key: item["value"]["id"]
                    });}
                }
                    catch(err){
                        //console.log(err);
                    }};
                setNotionContent(notion);
                setIsLoading(false);
            });
        }});
        return (
            <section className="card-container">
            {isLoading ? <h2>loading...</h2>:
            notionContent.map((item)=>{
                return (
                    <Link className="a card" key={item.key} to={`/blog/${item.key}`}>{item.title}
                    </Link>
                )
            }
        )}
            <Outlet />
            </section>
        )

}


export default function Blogs() {
    const {slug} = useParams();
    if (slug === undefined){
        return (
            <section className="card-container">
            <BlogList />
            </section>
        )
    }
    else {
        return (
            <section className="card-container">
            <Blog />
            </section>
        )
    }
};

