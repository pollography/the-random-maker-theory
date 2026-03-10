<!--
  TRMT Cookie Consent Banner
  - Nutzt Design-System Tokens (Dark Grain Moody)
  - Opt-in für Analytics (Umami)
  - Zukunftssicher: Marketing-Kategorie vorbereitet (Affiliates, Ads)
  - Consent wird in localStorage gespeichert
  - Blockt Umami-Script bis Consent gegeben
-->

<script>
  let showBanner = $state(false);
  let showDetails = $state(false);
  let analyticsConsent = $state(true);
  let marketingConsent = $state(false);

  const CONSENT_KEY = 'trmt-cookie-consent';
  const CONSENT_VERSION = 1;

  // Check consent on mount
  $effect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.version === CONSENT_VERSION) {
            analyticsConsent = parsed.analytics;
            marketingConsent = parsed.marketing;
            applyConsent();
          } else {
            // Version changed, re-ask
            showBanner = true;
          }
        } catch {
          showBanner = true;
        }
      } else {
        showBanner = true;
      }
    }
  });

  function saveConsent() {
    const consent = {
      version: CONSENT_VERSION,
      analytics: analyticsConsent,
      marketing: marketingConsent,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    applyConsent();
    showBanner = false;
  }

  function acceptAll() {
    analyticsConsent = true;
    marketingConsent = true;
    saveConsent();
  }

  function acceptEssential() {
    analyticsConsent = false;
    marketingConsent = false;
    saveConsent();
  }

  function saveSelection() {
    saveConsent();
  }

  function applyConsent() {
    if (typeof window === 'undefined') return;

    // Analytics: Umami
    if (analyticsConsent) {
      enableUmami();
    } else {
      disableUmami();
    }

    // Marketing: Zukunft (Affiliate-Tracking, Ads, etc.)
    // Wird aktiviert wenn marketingConsent true ist
    if (marketingConsent) {
      window.dispatchEvent(new CustomEvent('trmt:marketing-consent', { detail: true }));
    }
  }

  function enableUmami() {
    if (typeof window === 'undefined') return;
    // Check if Umami script already loaded
    if (document.querySelector('script[data-website-id]')) return;

    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://cloud.umami.is/script.js';
    script.setAttribute('data-website-id', getUmamiId());
    document.head.appendChild(script);
  }

  function disableUmami() {
    if (typeof window === 'undefined') return;
    const script = document.querySelector('script[data-website-id]');
    if (script) script.remove();
    // Set umami disable flag
    localStorage.setItem('umami.disabled', '1');
  }

  function getUmamiId() {
    return 'baab8505-1eee-4706-adeb-4bfea05b4771';
  }
</script>

{#if showBanner}
  <div class="cookie-overlay" role="dialog" aria-label="Cookie-Einstellungen">
    <div class="cookie-banner">
      <div class="cookie-header">
        <span class="cookie-icon">&#127850;</span>
        <h3>Kurz was zu Cookies</h3>
      </div>

      <p class="cookie-text">
        Ich nutze Umami für anonyme Besucherstatistiken (keine Werbung, kein Tracking über andere Seiten).
        Du kannst selbst entscheiden, was aktiv sein darf.
      </p>

      {#if showDetails}
        <div class="cookie-details">
          <label class="cookie-option">
            <div class="option-info">
              <span class="option-name">Notwendig</span>
              <span class="option-desc">Seite funktioniert, keine Cookies</span>
            </div>
            <input type="checkbox" checked disabled />
            <span class="checkmark always-on">Immer an</span>
          </label>

          <label class="cookie-option">
            <div class="option-info">
              <span class="option-name">Statistiken</span>
              <span class="option-desc">Umami Analytics, cookielos, anonymisiert</span>
            </div>
            <input type="checkbox" bind:checked={analyticsConsent} />
            <span class="toggle" class:active={analyticsConsent}></span>
          </label>

          <label class="cookie-option">
            <div class="option-info">
              <span class="option-name">Marketing</span>
              <span class="option-desc">Affiliate-Links, Werbepartner (aktuell keine)</span>
            </div>
            <input type="checkbox" bind:checked={marketingConsent} />
            <span class="toggle" class:active={marketingConsent}></span>
          </label>
        </div>
      {/if}

      <div class="cookie-actions">
        {#if showDetails}
          <button class="btn-save" onclick={saveSelection}>Auswahl speichern</button>
        {:else}
          <button class="btn-details" onclick={() => showDetails = true}>Einstellungen</button>
        {/if}
        <button class="btn-essential" onclick={acceptEssential}>Nur Notwendige</button>
        <button class="btn-accept" onclick={acceptAll}>Alles akzeptieren</button>
      </div>

      <a href="/datenschutz" class="cookie-privacy-link">Datenschutzerklärung</a>
    </div>
  </div>
{/if}

<style>
  .cookie-overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    padding: 1rem;
    pointer-events: none;
  }

  .cookie-banner {
    pointer-events: all;
    max-width: 520px;
    margin: 0 auto 0 0;
    background: var(--color-surface);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-lg);
    padding: 1.25rem 1.5rem;
    box-shadow:
      0 -4px 20px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    animation: slideUp 0.3s ease-out;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .cookie-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .cookie-icon {
    font-size: 1.25rem;
  }

  .cookie-header h3 {
    font-family: var(--font-display);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-base);
    color: var(--color-text);
    margin: 0;
  }

  .cookie-text {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    line-height: 1.5;
    margin: 0 0 1rem 0;
  }

  .cookie-details {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border-subtle);
  }

  .cookie-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    cursor: pointer;
  }

  .cookie-option input {
    display: none;
  }

  .option-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .option-name {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
  }

  .option-desc {
    font-size: 0.75rem;
    color: var(--color-text-dim);
  }

  .checkmark.always-on {
    font-size: 0.7rem;
    color: var(--color-accent-teal);
    white-space: nowrap;
  }

  .toggle {
    width: 36px;
    height: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-full);
    position: relative;
    transition: background 0.2s ease;
    flex-shrink: 0;
  }

  .toggle::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-text-muted);
    top: 2px;
    left: 2px;
    transition: all 0.2s ease;
  }

  .toggle.active {
    background: var(--color-accent-honey-subtle);
  }

  .toggle.active::after {
    left: 18px;
    background: var(--color-accent-honey);
  }

  .cookie-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .cookie-actions button {
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    font-family: var(--font-sans);
    cursor: pointer;
    transition: all 0.15s ease;
    border: none;
  }

  .btn-accept {
    background: var(--color-accent-honey);
    color: #0b0b0b;
    flex: 1;
  }

  .btn-accept:hover {
    background: var(--color-accent-honey-hover);
  }

  .btn-essential {
    background: transparent;
    color: var(--color-text-muted);
    border: 1px solid var(--color-border-subtle) !important;
  }

  .btn-essential:hover {
    color: var(--color-text);
    border-color: rgba(255, 255, 255, 0.12) !important;
  }

  .btn-details {
    background: transparent;
    color: var(--color-text-muted);
    border: 1px solid var(--color-border-subtle) !important;
  }

  .btn-details:hover {
    color: var(--color-text);
  }

  .btn-save {
    background: var(--color-accent-teal);
    color: #0b0b0b;
    flex: 1;
  }

  .btn-save:hover {
    background: var(--color-accent-teal-hover);
  }

  .cookie-privacy-link {
    display: block;
    text-align: center;
    margin-top: 0.75rem;
    font-size: 0.7rem;
    color: var(--color-text-dim);
    text-decoration: none;
  }

  .cookie-privacy-link:hover {
    color: var(--color-text-muted);
  }

  @media (max-width: 640px) {
    .cookie-overlay {
      padding: 0.5rem;
    }

    .cookie-banner {
      max-width: 100%;
      padding: 1rem;
    }

    .cookie-actions {
      flex-direction: column;
    }

    .cookie-actions button {
      width: 100%;
    }
  }
</style>
