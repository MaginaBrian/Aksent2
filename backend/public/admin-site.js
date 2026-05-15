/** Site content admin UI — loaded by admin.html */
(function () {
  const sitePanel = document.getElementById('sitePanel');
  if (!sitePanel) return;

  const statusEl = document.getElementById('siteStatus');
  let siteData = null;

  function setSiteStatus(kind, msg) {
    if (!statusEl) return;
    statusEl.className = kind === 'ok' ? 'ok' : kind === 'err' ? 'err' : 'muted';
    statusEl.textContent = msg;
  }

  function field(label, name, value, type = 'text', rows) {
    if (type === 'textarea') {
      return `<label>${label}<textarea name="${name}" rows="${rows || 3}">${window.escapeHtml?.(value) ?? value ?? ''}</textarea></label>`;
    }
    return `<label>${label}<input name="${name}" value="${(value ?? '').replace(/"/g, '&quot;')}" /></label>`;
  }

  function renderSiteForm() {
    if (!siteData) return;
    const g = siteData.global || {};
    const h = siteData.home || {};
    const a = siteData.about || {};
    const c = siteData.contact || {};
    const w = siteData.work || {};

    sitePanel.innerHTML = `
        <p class="muted">Edit page copy and media. Save each section after changes.</p>
        <div class="hr"></div>

        <h3 style="margin:0 0 10px;font-size:13px">Global (header logo & footer)</h3>
        <form id="formGlobal" class="site-form">
          ${field('Site name', 'siteName', g.siteName)}
          ${field('Logo URL', 'logoUrl', g.logoUrl)}
          <label>Upload new logo<input type="file" name="logoFile" accept="image/*" /></label>
          ${field('Footer brand', 'footerBrand', g.footerBrand)}
          ${field('Footer tagline', 'footerTagline', g.footerTagline)}
          ${field('Footer phone', 'footerPhone', g.footerPhone)}
          ${field('Footer email', 'footerEmail', g.footerEmail)}
          ${field('Footer address', 'footerAddress', g.footerAddress)}
          ${field('Footer web URL', 'footerWebUrl', g.footerWebUrl)}
          ${field('Footer web label', 'footerWebLabel', g.footerWebLabel)}
          <button type="submit" class="btn primary">Save global</button>
        </form>

        <div class="hr"></div>
        <h3 style="margin:0 0 10px;font-size:13px">Home — hero carousel</h3>
        <div class="thumbs" id="heroThumbs"></div>
        <form id="formHeroUpload" class="row" style="margin:8px 0">
          <label style="flex:1">Add hero slide<input type="file" name="file" accept="image/*" required /></label>
          <button type="submit" class="btn small primary">Upload slide</button>
        </form>
        <form id="formHome" class="site-form">
          ${field('Hero label', 'heroIndexLabel', h.heroIndexLabel)}
          ${field('Hero title line 1', 'heroTitleLine1', h.heroTitleLine1)}
          ${field('Hero title emphasis', 'heroTitleEmphasis', h.heroTitleEmphasis)}
          ${field('Hero lead', 'heroLead', h.heroLead, 'textarea', 4)}
          ${field('Services (one per line)', 'servicesItems', (h.servicesItems || []).join('\n'), 'textarea', 5)}
          ${field('Pull quote', 'pullQuote', h.pullQuote)}
          <button type="submit" class="btn primary">Save home text</button>
        </form>

        <div class="hr"></div>
        <h3 style="margin:0 0 10px;font-size:13px">About — carousel</h3>
        <div class="thumbs" id="aboutThumbs"></div>
        <form id="formAboutUpload" class="row" style="margin:8px 0">
          <label style="flex:1">Add about image<input type="file" name="file" accept="image/*" required /></label>
          <button type="submit" class="btn small primary">Upload</button>
        </form>
        <form id="formAbout" class="site-form">
          ${field('Hero label', 'heroLabel', a.heroLabel)}
          ${field('Founding year', 'foundingYear', a.foundingYear)}
          ${field('Founding lead', 'foundingLead', a.foundingLead, 'textarea', 3)}
          ${field('Founding paragraphs (one per line)', 'foundingParagraphs', (a.foundingParagraphs || []).join('\n'), 'textarea', 6)}
          ${field('How paragraphs (one per line)', 'howParagraphs', (a.howParagraphs || []).join('\n'), 'textarea', 5)}
          <button type="submit" class="btn primary">Save about text</button>
        </form>

        <div class="hr"></div>
        <h3 style="margin:0 0 10px;font-size:13px">Contact</h3>
        <form id="formContact" class="site-form">
          ${field('Intro', 'intro', c.intro, 'textarea', 3)}
          ${field('Phone', 'phone', c.phone)}
          ${field('Phone (tel link)', 'phoneTel', c.phoneTel)}
          ${field('Email', 'email', c.email)}
          ${field('Address HTML', 'addressHtml', c.addressHtml, 'textarea', 2)}
          ${field('Web URL', 'webUrl', c.webUrl)}
          ${field('Web label', 'webLabel', c.webLabel)}
          ${field('Statement heading line 1', 'statementHeadingLine1', c.statementHeadingLine1)}
          ${field('Statement emphasis', 'statementHeadingEmphasis', c.statementHeadingEmphasis)}
          ${field('Statement sub', 'statementSub', c.statementSub, 'textarea', 2)}
          <button type="submit" class="btn primary">Save contact</button>
        </form>

        <div class="hr"></div>
        <h3 style="margin:0 0 10px;font-size:13px">Work page hero</h3>
        <form id="formWork" class="site-form">
          ${field('Hero label', 'heroLabel', w.heroLabel)}
          ${field('Hero title line 1', 'heroTitleLine1', w.heroTitleLine1)}
          ${field('Hero title emphasis', 'heroTitleEmphasis', w.heroTitleEmphasis)}
          ${field('Hero lead', 'heroLead', w.heroLead, 'textarea', 3)}
          <button type="submit" class="btn primary">Save work page</button>
        </form>
    `;

    renderMediaThumbs('heroThumbs', h.heroSlides || [], 'hero');
    renderMediaThumbs('aboutThumbs', a.carouselImages || [], 'about-carousel');
    bindSiteForms();
  }

  function renderMediaThumbs(containerId, urls, kind) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = (urls || []).map((url) => `
      <div style="position:relative">
        <img src="${url}" alt="" style="width:84px;height:56px;object-fit:cover;border-radius:8px" />
        <button type="button" class="btn small danger" style="position:absolute;top:2px;right:2px;padding:2px 6px"
          data-del-media="${kind}" data-url="${url.replace(/"/g, '&quot;')}">×</button>
      </div>
    `).join('');
    el.querySelectorAll('[data-del-media]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (!confirm('Remove this image from the carousel?')) return;
        try {
          await window.adminApi(`/api/site/media/${btn.dataset.delMedia}?url=${encodeURIComponent(btn.dataset.url)}`, {
            method: 'DELETE',
            headers: { ...window.adminAuthHeaders() },
          });
          await loadSite();
          setSiteStatus('ok', 'Image removed.');
        } catch (e) {
          setSiteStatus('err', e.message);
        }
      });
    });
  }

  function bindSiteForms() {
    document.getElementById('formGlobal')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const logoFile = fd.get('logoFile');
      if (logoFile && logoFile.size) {
        const body = new FormData();
        body.append('file', logoFile);
        await window.adminApi('/api/site/media/logo', { method: 'POST', headers: window.adminAuthHeaders(), body });
      }
      await saveSection('global', Object.fromEntries(fd.entries()));
    });

    ['formHome', 'formAbout', 'formContact', 'formWork'].forEach((id) => {
      document.getElementById(id)?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        const section = id.replace('form', '').toLowerCase();
        if (data.servicesItems) data.servicesItems = data.servicesItems.split('\n').map(s => s.trim()).filter(Boolean);
        if (data.foundingParagraphs) data.foundingParagraphs = data.foundingParagraphs.split('\n').map(s => s.trim()).filter(Boolean);
        if (data.howParagraphs) data.howParagraphs = data.howParagraphs.split('\n').map(s => s.trim()).filter(Boolean);
        await saveSection(section, data);
      });
    });

    document.getElementById('formHeroUpload')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      await window.adminApi('/api/site/media/hero', { method: 'POST', headers: window.adminAuthHeaders(), body: fd });
      e.target.reset();
      await loadSite();
      setSiteStatus('ok', 'Hero slide added.');
    });

    document.getElementById('formAboutUpload')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      await window.adminApi('/api/site/media/about-carousel', { method: 'POST', headers: window.adminAuthHeaders(), body: fd });
      e.target.reset();
      await loadSite();
      setSiteStatus('ok', 'About image added.');
    });
  }

  async function saveSection(section, data) {
    try {
      setSiteStatus('muted', 'Saving…');
      const payload = { [section]: data };
      if (payload[section]) {
        delete payload[section].logoFile;
        delete payload[section].file;
      }
      siteData = await window.adminApi('/api/site', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...window.adminAuthHeaders() },
        body: JSON.stringify(payload),
      });
      renderSiteForm();
      setSiteStatus('ok', 'Saved.');
    } catch (e) {
      setSiteStatus('err', e.message);
    }
  }

  async function loadSite() {
    setSiteStatus('muted', 'Loading site content…');
    siteData = await window.adminApi('/api/site');
    renderSiteForm();
    setSiteStatus('ok', 'Site content loaded.');
  }

  window.adminLoadSite = loadSite;
})();
