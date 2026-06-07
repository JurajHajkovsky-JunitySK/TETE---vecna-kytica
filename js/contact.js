/**
 * contact.js – Odoslanie kontaktného formulára cez Formspree
 * Večná kytica | https://formspree.io
 *
 * NASTAVENIE:
 *   1. Zaregistrujte sa na https://formspree.io (bezplatný plán stačí)
 *   2. Vytvorte nový formulár a skopírujte jeho ID
 *   3. Nahraďte reťazec 'YOUR_FORM_ID' nižšie vaším skutočným ID
 *      Príklad: 'xvojpqkb'
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqeggkop';

(function () {
  'use strict';

  const form      = document.getElementById('contact-form');
  const btnSubmit = document.getElementById('form-submit-btn');
  const statusEl  = document.getElementById('form-status');

  if (!form) return;

  // ── Validácia jedného poľa ───────────────────────────────────────────────
  function validateField(input) {
    const group    = input.closest('.form-group');
    const errorEl  = group ? group.querySelector('.form-error') : null;
    let   message  = '';

    input.classList.remove('invalid');

    if (input.required && !input.value.trim()) {
      message = 'Toto pole je povinné.';
    } else if (input.type === 'email' && input.value.trim()) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(input.value.trim())) {
        message = 'Zadajte platnú e-mailovú adresu.';
      }
    }

    if (message) {
      input.classList.add('invalid');
      if (errorEl) { errorEl.textContent = message; errorEl.classList.add('visible'); }
      return false;
    }

    if (errorEl) { errorEl.textContent = ''; errorEl.classList.remove('visible'); }
    return true;
  }

  // ── Live validácia pri opustení poľa ────────────────────────────────────
  form.querySelectorAll('input[required], textarea[required]').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) validateField(input);
    });
  });

  // ── Odoslanie formulára ─────────────────────────────────────────────────
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Honeypot – ak je vyplnené, ide o bota
    if (form.querySelector('[name="_gotcha"]')?.value) return;

    // Validácia všetkých povinných polí
    const fields = Array.from(form.querySelectorAll('input[required]:not([type="checkbox"]), textarea[required]'));
    const valid  = fields.map(validateField).every(Boolean);

    const consent = form.querySelector('#contact-consent');
    const consentError = consent?.closest('.form-group')?.querySelector('.form-error');
    if (consent && !consent.checked) {
      if (consentError) { consentError.textContent = 'Súhlas je povinný.'; consentError.classList.add('visible'); }
      if (!valid) fields.find(f => f.classList.contains('invalid'))?.focus();
      else consent.focus();
      return;
    }
    if (consentError) { consentError.textContent = ''; consentError.classList.remove('visible'); }

    if (!valid) {
      fields.find(f => f.classList.contains('invalid'))?.focus();
      return;
    }

    setLoading(true);
    hideStatus();

    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        body:    data,
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        showStatus('success',
          '✅ Ďakujeme! Vaša správa bola odoslaná. Ozveme sa vám čo najskôr.');
        form.reset();
        fields.forEach(f => { f.classList.remove('invalid'); });
      } else {
        const json = await response.json().catch(() => ({}));
        const msg  = json?.errors?.map(err => err.message).join(', ')
                     || 'Neznáma chyba servera.';
        showStatus('error', `❌ Odoslanie zlyhalo: ${msg}`);
      }
    } catch {
      showStatus('error',
        '❌ Nepodarilo sa odoslať správu. Skontrolujte internetové pripojenie a skúste znova.');
    } finally {
      setLoading(false);
    }
  });

  // ── Pomocné funkcie ─────────────────────────────────────────────────────
  function setLoading(on) {
    btnSubmit.disabled = on;
    btnSubmit.classList.toggle('loading', on);
  }

  function showStatus(type, message) {
    statusEl.className  = `form-status ${type}`;
    statusEl.textContent = message;
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideStatus() {
    statusEl.className   = 'form-status';
    statusEl.textContent = '';
  }
})();
