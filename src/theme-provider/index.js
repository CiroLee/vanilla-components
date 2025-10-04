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
          --primary-color: #0D65F2;
          --warning-color: #FFAB1A;
          --danger-color: #F03D4F;

        }
      </style>
      <slot></slot>
    `;
  }
}
