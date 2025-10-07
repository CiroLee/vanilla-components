class VaThemeProvider extends HTMLElement {
  static {
    customElements.define('va-theme-provider', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        :host {
          --black-color: #181818;
          --primary-color: #0D65F2;
          --warning-color: #FFAB1A;
          --success-color: #10CC4B;
          --danger-color: #F03D4F;
          --border-color: color-mix(in oklch, var(--black-color) 15%, white 85%);
          --secondary-text-color: color-mix(in oklch, var(--black-color) 60%, white 40%);
        }
      </style>
      <slot></slot>
    `;
  }
}
