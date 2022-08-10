import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Header({ curroute }) {
  let head = 'ARTH';
  const isBlog = curroute.includes('blog');
  if (curroute.startsWith('/blog')) {
    head += "'S BLOG";
  }
  return (
    <div className="header">
      <Link className="a" to="/">
        <h1>{head}</h1>
      </Link>
      {isBlog && (
      <>
        <Link className="links display-links" to="/blog">All Blogs</Link>
        <p>Todo: Fix images in blogs.</p>
        <a href="https://blog.arthtyagi.xyz" rel="noreferrer" target="_blank">Visit blog.arthtyagi.xyz if you truly can&apost stand this.</a>
        <p>
          Open-sourced at
          {' '}
          <a href="https:github.com/arthtyagi/serverless-notion-blog/" rel="noreferrer" target="_blank">github.com/arthtyagi/serverless-notion-blog/</a>
        </p>
      </>
      )}
    </div>
  );
}

Header.propTypes = {
  curroute: PropTypes.string.isRequired,
};
