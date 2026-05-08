import { Link } from 'react-router-dom';
import './Page.css';

export default function Forum() {
  return (
    <>
      <section className="page-hero page-hero--forum">
        <div className="container">
          <h1 className="page-hero__title">Forum</h1>
          <p className="page-hero__lead">
            Publishing and knowledge circulation. Ideas that move—through editorial, events, and thought leadership.
          </p>
        </div>
      </section>
      <section className="page-content">
        <div className="container">
          <div className="prose">
            <h2>Knowledge in motion</h2>
            <p>
              Forum is where AKSENT’s thinking meets the world. We publish essays, host conversations, and create spaces for knowledge to circulate—bridging practice, research, and public discourse.
            </p>
            <h2>What we do</h2>
            <ul>
              <li>Editorial and long-form content</li>
              <li>Events and roundtables</li>
              <li>Research dissemination</li>
              <li>Partnership and co-publishing</li>
            </ul>
            <p>
              <Link to="/contact" className="btn btn--primary">Start a conversation</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
