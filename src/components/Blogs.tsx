import React, { useState } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Blog from './Blog';
import { genURL } from '../helpers/dataProcessor';

const NOTION_URL = import.meta.env.VITE_NOTION_URL;

function getData(url: string) {
  return axios.get(url).then((res) => res);
}

interface NotionListItem {
  title: string;
  url: string;
  key: string;
}

function BlogList(): JSX.Element {
  const [notionList, setNotionList] = useState<NotionListItem[]>([]);
  const isNotionListEmpty = notionList.length === 0;
  const notionQuery = useQuery(['page', 'notion'], () => getData(`${NOTION_URL}`));
  if (notionQuery.isLoading) {
    return <h2>Loading...</h2>;
  }
  if (notionQuery.isError) {
    return <h2>Error</h2>;
  }

  const notion: NotionListItem[] = [];
  const { data } = notionQuery;
  const dataMap = new Map(Object.entries(data.data));
  const dataList = Array.from(dataMap.values());

  if (isNotionListEmpty) {
    for (const item of dataList as any) {
      try {
        // 629... is the pageId of my base page
        if (item.value.type === 'page' && item.value.id !== '629c6203-1af3-4bf3-b5dc-2335730153f4') {
          notion.push({
            title: item.value.properties.title[0][0],
            url: genURL(item),
            key: item.value.id,
          });
        }
      } catch (err) {
        // console.log(err);
      }
    }
    setNotionList(notion);
  }
  return (
    <section className="card-container">
      {notionList.map((item) => (
        <Link className="a card" key={item.key} to={`/blog/${item.key}`}>
          {item.title}
        </Link>
      ))}
      <Outlet />
    </section>
  );
}

export default function Blogs() {
  const { slug } = useParams();
  if (slug === undefined) {
    return (
      <section className="card-container">
        <BlogList />
      </section>
    );
  }

  return (
    <section className="card-container">
      <Blog />
    </section>
  );
}
