import { Link } from 'react-router-dom';
import './Page.css';

export default function Studio() {
  return (
    <>
      <section className="page-hero page-hero--studio">
        <div className="container">
          <h1 className="page-hero__title">Studio</h1>
          <p className="page-hero__lead">
            Applied documentation of making and material intelligence. Where craft meets strategy and brand becomes experience.
          </p>
        </div>
      </section>
      <section className="page-content">
        <div className="container">
          <div className="prose">
            <h2>Crafting transformative experiences</h2>
            <p>
              Studio is our applied design practice—brand identity, digital real estate, event branding, and content creation. We document making and material intelligence to create compelling touchpoints that make your brand not only visible but deeply felt and remembered.
            </p>
            <h2>Our approach</h2>
            <ul>
              <li>Briefing — the blueprint: laying the groundwork through comprehensive discussions about your vision</li>
              <li>Research &amp; analytics — the deep dive: dissecting market trends and consumer behaviour</li>
              <li>Creative strategy — the masterstroke: transforming insights into compelling designs</li>
              <li>Realization — the grand unveiling: taking your brand experience from concept to reality</li>
              <li>Feedback alchemy — the refinement loop: continually optimizing through real-time feedback</li>
            </ul>
            <p>
              <Link to="/work" className="btn btn--primary">View our work</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
