const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    a {
      all: unset;
      cursor: pointer;
    }
    .show-card__main {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 160px;
      box-sizing: border-box;
      border-radius: 6px;
      border: 1px solid color-mix(in oklch, black 10%, white 90%);
      transition-property: background-color, border-color;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      background-color: #f6f6f6;
      &:hover {
        border-color: var(--primary-color);
        background-color: color-mix(in oklch, var(--primary-color) 10%, white 80%);
      }
    }
    .name {
      margin: 0;
      padding-top: 6px;
      color: color-mix(in oklch, var(--black-color) 60%, white 40%);
      }
  </style>
  <a class="show-card">
    <div class="show-card__main"><slot></slot></div>
    <p class="name"></p>
  </a>
`;
class ShowCard extends HTMLElement {
  #anchorEl;
  static {
    customElements.define('show-card', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#anchorEl = this.shadowRoot.querySelector('a');
  }

  static get observedAttributes() {
    return ['href', 'name'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'href') {
      this.#anchorEl.href = newValue;
    } else if (name === 'name') {
      this.shadowRoot.querySelector('.name').textContent = newValue;
    }
  }
}
