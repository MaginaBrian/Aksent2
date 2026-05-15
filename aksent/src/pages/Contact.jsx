import { useSite } from '../context/SiteContent';
import './Page.css';
import './Contact.css';

export default function Contact() {
  const { site } = useSite();
  const c = site?.contact;
  if (!c) return null;

  return (
    <>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <span className="page-hero__label">{c.heroLabel}</span>
          <h1 className="page-hero__title">
            {c.heroTitleLine1} <em>{c.heroTitleEmphasis}</em>
          </h1>
        </div>
      </section>

      <div className="contact">
        <div className="contact__details">
          <p className="contact__intro">{c.intro}</p>
          <div className="contact__items">
            <div className="contact__item">
              <span className="contact__item-label">Phone</span>
              <a href={`tel:${c.phoneTel || c.phone}`} className="contact__item-value">{c.phone}</a>
            </div>
            <div className="contact__item">
              <span className="contact__item-label">Email</span>
              <a href={`mailto:${c.email}`} className="contact__item-value">{c.email}</a>
            </div>
            <div className="contact__item">
              <span className="contact__item-label">Address</span>
              <span
                className="contact__item-value"
                dangerouslySetInnerHTML={{ __html: c.addressHtml }}
              />
            </div>
            <div className="contact__item">
              <span className="contact__item-label">Web</span>
              <a href={c.webUrl} target="_blank" rel="noopener noreferrer" className="contact__item-value">
                {c.webLabel}
              </a>
            </div>
          </div>
        </div>

        <div className="contact__statement-wrap">
          <div className="contact__statement">
            <span className="contact__statement-label">{c.statementLabel}</span>
            <div>
              <h2 className="contact__statement-heading">
                {c.statementHeadingLine1}<br />it is a <em>{c.statementHeadingEmphasis}</em>
              </h2>
              <p className="contact__statement-sub">{c.statementSub}</p>
              <a href={`mailto:${c.email}`} className="btn-primary">{c.statementButton}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
