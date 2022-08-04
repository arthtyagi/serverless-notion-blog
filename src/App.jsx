import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Octokit } from "@octokit/core";
import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import About from "./components/About";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";

const githubToken = import.meta.env.REACT_APP_GITHUB_TOKEN;
const octokit = new Octokit({auth: githubToken});

function Home() {
  return (
    <>
      <Content />
      <br></br>
      <h2>[RECENT BLOGS]</h2>
      <Blogs />
    </>
  );
}

export default function App() {
  const [ghdata, setGHDATA] = useState([]);
  const fetchghData = async ()=>{
    const content = (await octokit.request("GET /repos/arthtyagi/arthtyagi/contents/README.md?ref=master")).data.content;
    setGHDATA(content);};
  useEffect(()=>{
    fetchghData();},[]);
  let curroute = (useLocation().pathname);
  return (
    <div>
      <Header curroute={curroute} />
      <br></br>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blog" element={<Blogs />}>
          <Route path=":slug" element={<Blog />} />
        </Route>
        <Route path="/about" element={<About ghdata={ghdata} />} />
      </Routes>
     </div>
  );
}