(()=>{let lang=localStorage.getItem('schoobi-language')==='bn'?'bn':'en';const apply=()=>{document.querySelectorAll('.lang').forEach(x=>x.classList.toggle('active',x.classList.contains(lang)));document.documentElement.lang=lang;const b=document.getElementById('lang');if(b)b.textContent=lang==='en'?'বাংলা':'English';document.querySelectorAll('[data-en][data-bn]').forEach(x=>x.textContent=x.dataset[lang]);localStorage.setItem('schoobi-language',lang)};apply();document.getElementById('lang')?.addEventListener('click',()=>{lang=lang==='en'?'bn':'en';apply()});document.getElementById('menu')?.addEventListener('click',()=>document.getElementById('links').classList.toggle('open'));const contact=document.getElementById('contactForm');contact?.addEventListener('submit',async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(contact));const status=document.getElementById('formStatus');status.textContent=lang==='bn'?'পাঠানো হচ্ছে...':'Sending...';try{await fetch(window.SCHOOBl_CONTACT_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(d)});status.textContent=lang==='bn'?'অনুরোধ পাঠানোর চেষ্টা হয়েছে। নিশ্চিতকরণের জন্য ইমেইল করুন।':'Submission attempted. Email us for confirmation.';contact.reset()}catch{const body=encodeURIComponent(Object.entries(d).map(([k,v])=>k+': '+v).join('\n'));location.href='mailto:dolpiinshelp@gmail.com?subject=Schoobi%20enquiry&body='+body}});const del=document.getElementById('deleteForm');del?.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(del));const body=encodeURIComponent(Object.entries(d).map(([k,v])=>k+': '+v).join('\n'));location.href='mailto:dolpiinshelp@gmail.com?subject=Schoobi%20Account%20Deletion%20Request&body='+body;document.getElementById('deleteStatus').textContent=lang==='bn'?'ইমেইল অ্যাপে অনুরোধ তৈরি হয়েছে; পাঠানোর আগে যাচাই করুন।':'Email draft prepared. Review before sending.'});const el=document.getElementById('map');if(el&&window.L){const m=L.map(el,{scrollWheelZoom:false}).setView([22.3995,91.821],16);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors'}).addTo(m);L.marker([22.3995,91.821]).addTo(m).bindPopup('Schoobi · Koilarghor, Oxygen, Bayzid, Chittagong').openPopup();setTimeout(()=>m.invalidateSize(),300)}})();

document.addEventListener('click', (event) => {
  document.querySelectorAll('#links details.policy-dropdown[open]').forEach((dropdown) => {
    if (!dropdown.contains(event.target)) dropdown.removeAttribute('open');
  });
});
document.querySelectorAll('#links .policy-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    link.closest('details')?.removeAttribute('open');
    document.getElementById('links')?.classList.remove('open');
  });
});

/* GSAP ScrollTrigger motion system for Schoobi */
(function schoobiGsapMotion(){
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  if (!document.getElementById('schoobi-scroll-progress')) {
    const bar = document.createElement('div');
    bar.id = 'schoobi-scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
  }
  gsap.to('#schoobi-scroll-progress', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'max', scrub: 0.25 }
  });

  const heroItems = document.querySelectorAll('.hero .eyebrow, .hero h1, .hero .lead, .hero .btn, .page-hero .eyebrow, .page-hero h1, .page-hero .lead');
  if (heroItems.length) {
    gsap.from(heroItems, { y: 28, autoAlpha: 0, duration: 0.85, stagger: 0.11, ease: 'power3.out', delay: 0.08, clearProps: 'transform' });
  }

  document.querySelectorAll('.section').forEach((section) => {
    const items = section.querySelectorAll(':scope > .eyebrow, :scope > h2, :scope > .lead, :scope > p, :scope > .cards > article, :scope.cards > article, :scope > .feature-grid > article, :scope > .split > div');
    if (!items.length) return;
    gsap.from(items, {
      y: 42, autoAlpha: 0, duration: 0.8, stagger: 0.09, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 82%', once: true }
    });
  });

  const mock = document.querySelector('.mock');
  if (mock && window.innerWidth > 700) {
    gsap.fromTo(mock, { y: 35, rotateX: 7 }, {
      y: -12, rotateX: 0, ease: 'none',
      scrollTrigger: { trigger: mock, start: 'top bottom', end: 'bottom top', scrub: 0.7 }
    });
  }

  document.querySelectorAll('.feature-grid article, .cards:not(.feature-grid) article').forEach((card) => {
    card.addEventListener('pointerenter', () => gsap.to(card, { y: -5, duration: 0.22, ease: 'power2.out' }));
    card.addEventListener('pointerleave', () => gsap.to(card, { y: 0, duration: 0.28, ease: 'power2.out' }));
  });
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
})();
