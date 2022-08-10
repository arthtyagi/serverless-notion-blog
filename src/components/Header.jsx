import React from "react";
import {Link} from "react-router-dom";

export default function Header({curroute}){
    let head = "ARTH";
    let isBlog = curroute.includes("blog");
    if(curroute.startsWith("/blog")){
        head += "'S BLOG";
    }
    return (
        <div className="header">
            <Link className="a" to="/">
              <h1>{head}</h1>
            </Link>
            {isBlog && <><Link className="links display-links" to="/blog">All Blogs</Link>
            <p>Todo: Fix images in blogs.</p>
            <a href="https://blog.arthtyagi.xyz" rel="noreferrer" target="_blank">Visit blog.arthtyagi.xyz if you truly can't stand this.</a>
            <p>P.S I'm open-sourcing this rendering project anyway. And, I'll switch my blog to Remix soon.</p>
            </>
            }
        </div>
    )
}
