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
          --primary-color: #3b5bdb;
          --primary-active-color: #364fc7;
        }
      </style>
      <slot></slot>
    `;
  }
}
