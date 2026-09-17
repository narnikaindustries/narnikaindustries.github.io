'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
function closeMenu() {
  navigation?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });
const form = document.querySelector('#enquiry-form');
if (form) {
  const interest = new URLSearchParams(location.search).get('interest');
  if (['plates', 'cups', 'custom-paper', 'carry-bags', 'packaging', 'general'].includes(interest)) form.elements.interest.value = interest;
  if (interest === 'custom-paper') form.elements.branding.value = 'Custom printed / branded';
  if (interest === 'cups') form.elements.branding.value = 'Plain / non-customized';
  const status = document.querySelector('#form-status');
  function brief() {
    const values = new FormData(form);
    const product = form.elements.interest.selectedOptions[0].textContent;
    return 'Business enquiry — Narnika Industries\n\n' + [
      ['Name', values.get('name')], ['Email', values.get('email')],
      ['Company', values.get('company')], ['Product interest', product],
      ['Business sector', values.get('sector')], ['Paper branding preference', values.get('branding')],
      ['Estimated quantity', values.get('quantity')], ['Delivery destination', values.get('destination')],
      ['Requirements', values.get('message')]
    ].map(([label, value]) => `${label}: ${String(value).trim() || 'Not specified'}`).join('\n\n');
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const product = form.elements.interest.selectedOptions[0].textContent;
    location.href = `mailto:sales@ekomorph.com?subject=${encodeURIComponent('Narnika enquiry: ' + product)}&body=${encodeURIComponent(brief())}`;
    status.textContent = 'Your email app has been requested. Review the draft and send it to sales@ekomorph.com. If no app opens, download your brief and attach it to an email. Nothing has been sent by this website.';
    status.focus();
  });
  document.querySelector('#download-brief')?.addEventListener('click', () => {
    if (!form.reportValidity()) return;
    const blob = new Blob([brief()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'narnika-business-enquiry.txt';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Your enquiry brief is ready to download. Email it to sales@ekomorph.com when you are ready. This download does not send an enquiry.';
    status.focus();
  });
}
