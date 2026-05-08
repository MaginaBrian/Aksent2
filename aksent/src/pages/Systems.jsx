import { Link } from 'react-router-dom';
import './Page.css';

export default function Systems() {
  return (
    <>
      <section className="page-hero page-hero--systems">
        <div className="container">
          <h1 className="page-hero__title">Knowledge Systems</h1>
          <p className="page-hero__lead">
            Institutional consultancy and KM architecture. We help organisations capture, structure, and leverage collective wisdom to shape strategies and foster innovation.
          </p>
        </div>
      </section>
      <section className="page-content">
        <div className="container">
          <div className="prose">
            <h2>The Knowledge Economy</h2>
            <p>
              Amplifying your business’s collective wisdom to shape strategies and foster innovation. We design and implement knowledge architectures that make institutional knowledge findable, usable, and actionable.
            </p>
            <h2>What we offer</h2>
            <ul>
              <li>Knowledge audits and strategy</li>
              <li>Information architecture and taxonomies</li>
              <li>Documentation systems and workflows</li>
              <li>Training and change management</li>
            </ul>
            <p>
              <Link to="/contact" className="btn btn--primary">Discuss your project</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
