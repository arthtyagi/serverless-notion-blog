import React from 'react';
import { Link } from 'react-router-dom';

export default function Content() {
  return (
    <body>
      <subhead>[VENTURES]</subhead>
      <section className="flex-row">
        <a className="ventures display-links" rel="noreferrer" target="_blank" href="https://connectdome.com">ConnectDome</a>
        <a className="ventures display-links" rel="noreferrer" target="_blank" href="https://letterbolt.app">LetterBolt</a>
        <a className="ventures display-links" rel="noreferrer" target="_blank" href="https://nomofomo.lol">NomoFOMO.lol</a>
      </section>
      <br />
      <subhead>[PAST VENTURES]</subhead>
      <section className="flex-row">
        <a className="ventures display-links" rel="noreferrer" target="_blank" href="https://github.com/the-domecode">DomeCode</a>
      </section>
      <br />
      <subhead>[LINKS]</subhead>
      <section className="flex-row">
        <Link to="/blog" className="links display-links">Blog</Link>
        <a className="links display-links" href="https://github.com/arthtyagi" rel="noreferrer" target="_blank">Github</a>
        <a className="links display-links" href="https://www.twitter.com/arthtyagi/" rel="noreferrer" target="_blank">Twitter</a>
        <a className="links display-links" href="mailto:arth@connectdome.com" rel="noreferrer" target="_blank">Email</a>
      </section>
      <br />
      <subhead>[MUSIC]</subhead>
      <section className="flex-row">
        <a className="music display-links" href="https://soundcloud.com/ogtrillbill" rel="noreferrer" target="_blank">Soundcloud</a>
        <a className="music display-links" href="https://open.spotify.com/artist/2Y3z2msSOaboNTc6HCfdsB?si=X4WHP0Y9TLqRP6qngKKhwg&nd=1" rel="noreferrer" target="_blank">Spotify</a>
        <a className="music display-links" href="https://music.apple.com/ca/artist/trill-bill/1608644758" rel="noreferrer" target="_blank">Apple Music</a>
      </section>
    </body>
  );
}
