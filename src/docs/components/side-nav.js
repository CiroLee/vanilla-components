import { navigationConfig } from '../config/navigation.config.js';
class SideNav extends HTMLElement {
  activeId = '';
  static {
    customElements.define('side-nav', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['active'];
  }
  connectedCallback() {
    this.#render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active') {
      this.activeId = newValue;
    }
  }
  #render() {
    const list = navigationConfig.map((item) => `<a href="${item.path}" id="${item.id}" class="nav-link">${item.label}</a>`).join('');
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        .side-nav {
          position: fixed;
          top: 56px;
          bottom: 0;
          width: 240px;
          display: flex;
          flex-direction: column;
          padding: 8px;
          box-sizing: border-box;
          overflow: auto;
        }
        a {
          text-decoration: none;
          padding: 4px;
          transition: background-color 0.2s ease;
          color: color-mix(in oklch, var(--black-color) 80%, white 20%);
          border-radius: 4px 6px;
          font-size: 14px;
          &:hover {
            background-color: color-mix(in oklch, var(--black-color) 10%, white 90%);
          }
          &.active {
            color: var(--primary-color);
            font-weight: bold;
          }
        }
        @media (max-width: 928px) {
          .side-nav {
            display: none;
          }
        }
      </style>
      <side class="side-nav">${list}</side>
    `;
    this.#initActive(this.activeId);
  }
  #initActive(activeId) {
    const activeLink = this.shadowRoot.querySelector(`#${activeId}`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}
