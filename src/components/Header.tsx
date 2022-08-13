import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  curroute: string;
}
export default function Header({ curroute }: HeaderProps): JSX.Element {
  let head = 'ARTH';
  const isBlog = curroute.includes('blog');
  if (curroute.startsWith('/blog')) {
    head += "'S BLOG";
  }
  return (
    <>
      <div className="window">
        <div className="title-bar header">
          <Link className="title a" to="/">
            <h1>{head}</h1>
          </Link>
        </div>
      </div>
      {isBlog && (
      <p>
        <Link className="links display-links" to="/blog">All Blogs</Link>
        <br />
        Open-sourced on
        {' '}
        <a className="a" href="https://github.com/arthtyagi/serverless-notion-blog/" rel="noreferrer" target="_blank">Github</a>
      </p>
      )}
    </>
  );
}
