import './Page.css';
import './Contact.css';

export default function Contact() {
  return (
    <>
      {/* ── Page hero ── */}
      <section className="page-hero page-hero--compact">
        <div className="container">
          <span className="page-hero__label">Get in touch</span>
          <h1 className="page-hero__title">Let's <em>talk.</em></h1>
        </div>
      </section>

      {/* ── Contact body ── */}
      <div className="contact">

        {/* Left: details */}
        <div className="contact__details">
          <p className="contact__intro">
            Start a conversation to discuss knowledge systems, publishing, or studio work. We typically respond within 1–2 business days.
          </p>

          <div className="contact__items">
            <div className="contact__item">
              <span className="contact__item-label">Phone</span>
              <a href="tel:+254722311089" className="contact__item-value">+254 722 311 089</a>
            </div>
            <div className="contact__item">
              <span className="contact__item-label">Email</span>
              <a href="mailto:hello@aksent.co.ke" className="contact__item-value">hello@aksent.co.ke</a>
            </div>
            <div className="contact__item">
              <span className="contact__item-label">Address</span>
              <span className="contact__item-value">Jabavu Road, Kilimani<br />Nairobi, Kenya</span>
            </div>
            <div className="contact__item">
              <span className="contact__item-label">Web</span>
              <a href="https://www.aksent.co.ke" target="_blank" rel="noopener noreferrer" className="contact__item-value">
                www.aksent.co.ke
              </a>
            </div>
          </div>
        </div>

        {/* Right: statement panel */}
        <div className="contact__statement-wrap">
          <div className="contact__statement">
            <span className="contact__statement-label">AKSENT Studio</span>
            <div>
              <h2 className="contact__statement-heading">
                Clarity is not a finish —<br />it is a <em>foundation.</em>
              </h2>
              <p className="contact__statement-sub">
                For projects, collaborations, or general enquiries, reach out via email or phone.
              </p>
              <a href="mailto:hello@aksent.co.ke" className="btn-primary">Send us an email</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
