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
document.getElementById('year').textContent = new Date().getFullYear();
