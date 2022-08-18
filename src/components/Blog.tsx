import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { dataParser, NotionItem } from '../helpers/dataParsing';

const WORKER_URL = import.meta.env.VITE_WORKER_URL;
// VITE_WORKER_URL should be like: <workerurl>/v1/page/

export function getData(slug: string) {
  const url = `${WORKER_URL}${slug}`;
  return axios.get(url).then((res) => res.data);
}

interface BlogContentProps {
  slug: string;
}

function BlogContent({ slug }: BlogContentProps): JSX.Element {
  const [Content, setContent] = useState<NotionItem[]>([]);
  const isContentEmpty = Content.length === 0;
  const {
    data, isError, isLoading, isSuccess,
  } = useQuery(['page', slug], () => getData(slug));
  if (isLoading) {
    return (
      <article className="article-container">
        <h2>Loading...</h2>
      </article>
    );
  }
  if (isError) {
    return (
      <article className="article-container">
        <h2>Error</h2>
      </article>
    );
  }
  if (isContentEmpty && isSuccess) {
    // declare types for dataParser
    setContent(dataParser(data));
  }
  return (
    <article className="article-container">
      {Content.map((item) => (
        <div>
          {item.type === 'title' ? (
            <h3 className="list-title">{item.content}</h3>
          )
            : null}
          {item.type === 'quote' ? <i>{item.content}</i> : null}
          {item.type === 'text' ? <p>{item.content}</p> : null}
          {item.type === 'image' ? <img src={item.content} alt="notion" /> : null}
          {item.type === 'bulleted-list' ? <li>{item.content}</li> : null}
        </div>
      ))}
    </article>
  );
}

export default function Blog(): JSX.Element {
  const { slug } = useParams() as { slug: string };
  return (
    <section>
      <BlogContent slug={slug} />
    </section>
  );
}
