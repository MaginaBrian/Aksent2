import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProjectBySlug } from '../api/content';
import './Page.css';
import './Work.css';

export default function WorkProject() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setProject(null);
    fetchProjectBySlug(slug)
      .then((p) => { if (alive) setProject(p); })
      .catch(() => { if (alive) setProject(null); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [slug]);

  if (loading) {
    return (
      <section className="page-content">
        <div className="container">
          <p>Loading…</p>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="page-content">
        <div className="container">
          <p>Project not found.</p>
          <Link to="/work">Back to Work</Link>
        </div>
      </section>
    );
  }

  const images = useMemo(() => project.images ?? [], [project.images]);
  const hasImages = images.length > 0;
  const currentSrc = hasImages ? images[Math.min(index, images.length - 1)] : null;

  return (
    <>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <Link to="/work" className="work-project__back">
            ← All projects
          </Link>
          <h1 className="page-hero__title">{project.title}</h1>
          {project.description && (
            <p className="page-hero__lead">{project.description}</p>
          )}
        </div>
      </section>
      <section className="page-content work-project-content">
        <div className="container">
          {!hasImages ? (
            <div className="work-project__empty">
              <p>No images for this project yet.</p>
              <Link to="/work" className="btn btn--primary">Back to Work</Link>
            </div>
          ) : (
            <div className="work-image-viewer" aria-label="Project images">
              <div className="work-image-viewer__frame">
                <button
                  type="button"
                  className="work-image-viewer__btn work-image-viewer__btn--icon work-image-viewer__btn--prev work-image-viewer__btn--overlay"
                  onClick={() => setIndex((i) => (i <= 0 ? images.length - 1 : i - 1))}
                  aria-label="Previous image"
                >
                  <span className="sr-only">Previous</span>
                </button>
                <img src={currentSrc} alt="" className="work-image-viewer__img" />
                <button
                  type="button"
                  className="work-image-viewer__btn work-image-viewer__btn--icon work-image-viewer__btn--next work-image-viewer__btn--overlay"
                  onClick={() => setIndex((i) => (i >= images.length - 1 ? 0 : i + 1))}
                  aria-label="Next image"
                >
                  <span className="sr-only">Next</span>
                </button>
              </div>

              <div className="work-image-viewer__controls">
                <p className="work-image-viewer__counter">
                  {Math.min(index + 1, images.length)} / {images.length}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
