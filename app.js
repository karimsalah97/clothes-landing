async function loadConfig() {
  try {
    const res = await fetch('./Clothes-Design-Store.json', { cache: 'no-store' });
    const cfg = await res.json();

    // Theme
    const root = document.documentElement.style;
    const theme = cfg.theme || {};
    Object.entries(theme).forEach(([k, v]) => root.setProperty(`--${k}`, v));

    // Logo
    if (cfg.logo) document.getElementById('site-logo').src = cfg.logo;

    // Home
    const home = cfg.home || {};
    document.getElementById('home-title').textContent = home.title || '';
    document.getElementById('home-subtitle').innerHTML = home.subTitle || '';
    document.getElementById('cta-btn').textContent = home.btn || 'اطلب الآن';

    // Gallery
    const gallery = document.getElementById('gallery');
    (home.images || []).forEach(src => {
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.referrerPolicy = 'no-referrer';
      img.src = src;
      gallery.appendChild(img);
    });

    // FAQ
    const faq = cfg.faq || {};
    document.getElementById('faq-title').textContent = faq.title || 'الأسئلة الشائعة';
    document.getElementById('faq-subtitle').textContent = faq.subTitle || '';
    if (faq.image) document.getElementById('faq-image').src = faq.image;

    const faqList = document.getElementById('faq-list');
    (faq.list || []).forEach(item => {
      const div = document.createElement('div');
      div.className = 'faq-item';
      const h3 = document.createElement('h3');
      h3.textContent = item.title || '';
      const p = document.createElement('p');
      p.textContent = item.desc || '';
      div.appendChild(h3); div.appendChild(p);
      faqList.appendChild(div);
    });

    // Year
    document.getElementById('year').textContent = new Date().getFullYear();

  } catch (e) {
    console.error('Failed to load config', e);
  }
}
loadConfig();
