import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Blogs from './components/Blogs';
import Blog from './components/Blog';

function Home() {
  return (
    <>
      <Content />
      <br />
      <h2>[RECENT BLOGS]</h2>
      <Blogs />
    </>
  );
}

export default function App() {
  const curroute = (useLocation().pathname);
  return (
    <div>
      <Header curroute={curroute} />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blog" element={<Blogs />}>
          <Route path=":slug" element={<Blog />} />
        </Route>
      </Routes>
    </div>
  );
}
