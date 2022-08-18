import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { getData as getBlogList } from './Blogs';

const NOTION_URL = import.meta.env.VITE_NOTION_URL;

export default function Content(): JSX.Element {
  const queryClient = useQueryClient();
  return (
    <body>
      <p>
        I am a software developer and a music producer.
      </p>
      <br />
      <h2>[Current]</h2>
      <section className="flex-row">
        <p>
          Currently building a social-workspace platform for developers.
          <br />
          Launching this August.
        </p>
      </section>
      <br />
      <h2>[Side-projects]</h2>
      <section className="flex-row">
        <a className="display-links" rel="noreferrer" target="_blank" href="https://github.com/arthtyagi/serverless-notion-blog">Serverless Notion Blog</a>
      </section>
      <br />
      <h2>[Previous]</h2>
      <section className="flex-row">
        <a className="display-links" rel="noreferrer" target="_blank" href="https://connectdome.com">ConnectDome (2021-22)</a>
        <a className="display-links" rel="noreferrer" target="_blank" href="https://github.com/the-domecode">DomeCode (2020-21)</a>
      </section>
      <br />
      <h2>[LINKS]</h2>
      <section className="flex-row">
        <Link
          to="/blog"
          onMouseEnter={() => {
            queryClient.prefetchQuery(['page'], () => getBlogList(`${NOTION_URL}`));
          }}
          className="links display-links"
        >
          Blog

        </Link>
        <a className="display-links" href="https://github.com/arthtyagi" rel="noreferrer" target="_blank">Github</a>
        <a className="display-links" href="https://www.twitter.com/arthtyagi/" rel="noreferrer" target="_blank">Twitter</a>
        <a className="display-links" href="mailto:arth@connectdome.com" rel="noreferrer" target="_blank">Email</a>
      </section>
      <br />
      <h2>[MUSIC]</h2>
      <section className="flex-row">
        <a className="display-links" href="https://soundcloud.com/ogtrillbill" rel="noreferrer" target="_blank">Soundcloud</a>
        <a className="display-links" href="https://open.spotify.com/artist/2Y3z2msSOaboNTc6HCfdsB?si=X4WHP0Y9TLqRP6qngKKhwg&nd=1" rel="noreferrer" target="_blank">Spotify</a>
        <a className="display-links" href="https://music.apple.com/ca/artist/trill-bill/1608644758" rel="noreferrer" target="_blank">Apple Music</a>
      </section>
    </body>
  );
}
