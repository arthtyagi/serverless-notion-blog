import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { dataProcessor, NotionItem } from '../helpers/dataProcessor';

const WORKER_URL = import.meta.env.VITE_WORKER_URL;
// VITE_WORKER_URL should be like: <workerurl>/v1/page/

function getData(slug: string) {
  const url = `${WORKER_URL}${slug}`;
  return axios.get(url).then((res) => res.data);
}

interface BlogContentProps {
  slug: string;
}

function BlogContent({ slug }: BlogContentProps): JSX.Element {
  const [Content, setContent] = useState<NotionItem[]>([]);
  const isContentEmpty = Content.length === 0;
  const blogQuery = useQuery(['page', slug], () => getData(slug));
  if (blogQuery.isLoading) {
    return <h2>Loading...</h2>;
  }
  if (blogQuery.isError) {
    return <h2>Error</h2>;
  }
  const { data } = blogQuery;
  if (isContentEmpty) {
    // declare types for dataProcessor
    setContent(dataProcessor(data));
  }
  return (
    <>
      {Content.map((item) => (
        <div>
          {item.type === 'title' ? (
            <>
              <h2>{item.content}</h2>
              <br />
            </>
          )
            : null}
          {item.type === 'text' ? <p>{item.content}</p> : null}
          {item.type === 'image' ? <img src={item.content} alt="notion" /> : null}
          {item.type === 'bulleted-list' ? <li>{item.content}</li> : null}
        </div>
      ))}
    </>
  );
}

BlogContent.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default function Blog(): JSX.Element {
  const { slug } = useParams() as { slug: string };
  return (
    <section>
      <BlogContent slug={slug} />
    </section>
  );
}

BlogContent.propTypes = {
  slug: PropTypes.string.isRequired,
};
