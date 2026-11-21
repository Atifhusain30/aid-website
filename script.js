const services = {
  towing: { kicker: "WHEN THE CAR CAN'T GO", name: 'Towing', description: 'Need a lift for your vehicle? Set your pickup and destination, then review the quote before you request help.', meta: 'PICKUP → DESTINATION', glyph: '↗' },
  battery: { kicker: "WHEN THE BATTERY WON'T", name: 'Jump start', description: 'A dead battery can stop your day. Request a jump start at your pickup spot and follow the job in the app.', meta: 'BATTERY HELP → YOUR LOCATION', glyph: '↯' },
  tire: { kicker: 'WHEN A TIRE GOES FLAT', name: 'Flat tire', description: 'Get help with a flat when you have a usable spare. Share your location and vehicle details before requesting.', meta: 'TIRE HELP → YOUR LOCATION', glyph: '◎' },
  lockout: { kicker: 'WHEN THE KEYS ARE INSIDE', name: 'Lockout', description: 'Locked out of your vehicle? Request roadside lockout help and follow your driver through the app.', meta: 'LOCKOUT HELP → YOUR LOCATION', glyph: '⌁' },
  fuel: { kicker: "WHEN THE TANK IS EMPTY", name: 'Fuel delivery', description: 'Out of fuel away from a station? Request delivery to your location and get moving again.', meta: 'FUEL HELP → YOUR LOCATION', glyph: '◉' },
};

function selectService(tab) {
  const service = services[tab.dataset.service];
  if (!service) return;
  document.querySelectorAll('.service-tab').forEach((item) => {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  const panel = document.getElementById('service-panel');
  panel.setAttribute('aria-labelledby', tab.id);
  document.getElementById('service-kicker').textContent = service.kicker;
  document.getElementById('service-name').textContent = service.name;
  document.getElementById('service-description').textContent = service.description;
  document.getElementById('service-meta').textContent = service.meta;
  panel.querySelector('.visual-center').textContent = service.glyph;
  panel.querySelector('.visual-label').textContent = `AID / ${String(Object.keys(services).indexOf(tab.dataset.service) + 1).padStart(2, '0')}`;
}

document.querySelectorAll('.service-tab').forEach((tab) => {
  tab.tabIndex = tab.classList.contains('active') ? 0 : -1;
  tab.addEventListener('click', () => selectService(tab));
  tab.addEventListener('keydown', (event) => {
    const tabs = [...document.querySelectorAll('.service-tab')];
    const index = tabs.indexOf(tab);
    let target;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') target = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') target = tabs[0];
    if (event.key === 'End') target = tabs[tabs.length - 1];
    if (target) { event.preventDefault(); selectService(target); target.focus(); }
  });
});

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  document.body.classList.remove('menu-open');
}
menuButton.addEventListener('click', () => {
  const open = !menu.classList.contains('open');
  menu.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('menu-open', open);
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.querySelector('a[href="#driver-faq"]').addEventListener('click', () => {
  document.getElementById('driver-faq').open = true;
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
matchMedia('(min-width: 761px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });

// Show the actual app flow, captured on a simulator/test account; never simulate a booking here.
const captures = [
  { src: 'assets/screens/home.jpg', alt: 'Actual AID home screen with six roadside service choices and a saved test vehicle', caption: '01 / CHOOSE YOUR HELP' },
  { src: 'assets/screens/request.jpg', alt: 'Actual AID request sheet with a test address, vehicle and a quoted flat tire service', caption: '02 / REVIEW YOUR REQUEST' },
  { src: 'assets/screens/tracking.jpg', alt: 'Actual AID tracking screen with a test driver, test vehicle and approximate ETA', caption: '03 / FOLLOW THE JOB' },
];
const experienceTabs = [...document.querySelectorAll('.experience-tab')];
const experienceImage = document.getElementById('experience-image');
const experiencePanel = document.getElementById('experience-panel');
let experienceIndex = 0;
let captureRequest = 0;
function showExperience(index) {
  const next = (index + captures.length) % captures.length;
  const capture = captures[next];
  const request = ++captureRequest;
  experienceIndex = next;
  experienceTabs.forEach((tab, i) => {
    const selected = i === next;
    tab.classList.toggle('is-current', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  experiencePanel.setAttribute('aria-labelledby', experienceTabs[next].id);
  document.querySelector('.experience-progress span').style.transform = `translateX(${next * 100}%)`;
  document.getElementById('experience-count').textContent = `${String(next + 1).padStart(2, '0')} / 03`;
  const swap = () => {
    if (request !== captureRequest) return;
    experienceImage.src = capture.src;
    experienceImage.alt = capture.alt;
    document.getElementById('experience-caption').textContent = capture.caption;
    experienceImage.classList.remove('switching');
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return swap();
  experienceImage.classList.add('switching');
  const nextImage = new Image();
  nextImage.onload = swap;
  nextImage.onerror = swap; // Keep controls usable if a network request fails.
  nextImage.src = capture.src;
}
experienceTabs.forEach((tab, i) => {
  tab.addEventListener('click', () => showExperience(i));
  tab.addEventListener('keydown', (event) => {
    let target;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = (i + 1) % experienceTabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = (i - 1 + experienceTabs.length) % experienceTabs.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = experienceTabs.length - 1;
    if (target !== undefined) { event.preventDefault(); showExperience(target); experienceTabs[target].focus(); }
  });
});
document.getElementById('experience-prev').addEventListener('click', () => showExperience(experienceIndex - 1));
document.getElementById('experience-next').addEventListener('click', () => showExperience(experienceIndex + 1));

// Purposeful, once-only scroll reveals. The content remains visible with JS off or reduced motion.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealTargets = document.querySelectorAll('.section-head, .service-layout, .experience, .steps-grid, .statement-inner, .driver-grid, .faq-grid, .launch-inner');
  revealTargets.forEach((target) => target.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 80px 0px' });
  revealTargets.forEach((target) => observer.observe(target));
  document.documentElement.classList.add('motion-ready');
}
document.getElementById('year').textContent = new Date().getFullYear();
