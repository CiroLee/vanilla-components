class VaIcon extends HTMLElement {
  #prefix;
  #name;
  #size;
  #color;
  static {
    customElements.define('va-icon', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['prefix', 'name', 'size', 'color'];
  }

  set prefix(value) {
    this.setAttribute('prefix', value);
  }
  set name(value) {
    this.setAttribute('name', value);
  }
  set size(value) {
    this.setAttribute('size', value);
  }
  set color(value) {
    this.setAttribute('color', value);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'prefix') {
      this.#prefix = newValue;
    } else if (name === 'name') {
      this.#name = newValue;
    } else if (name === 'size') {
      this.#size = this.#formatSize(newValue);
    } else if (name === 'color') {
      this.#color = newValue;
    }
  }
  connectedCallback() {
    this.#render(this.#prefix, this.#name);
  }

  #formatSize(size) {
    const numericReg = /^[-+]?(?:\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
    return numericReg.test(size) ? `${size}px` : size;
  }
  async #render(prefix, name) {
    console.log(prefix, name);
    const res = await fetch(`https://api.iconify.design/${prefix}/${name}.svg`);
    const svg = await res.text();
    const size = this.#size || '1em';
    const color = this.#color || 'currentColor';

    this.shadowRoot.innerHTML = /* html */ `
      <style>
        :host{
          display:inline-block;
          vertical-align: 0;
        }
        svg {
          display: block;
          margin: auto;
          font-size: ${size};
          color: ${color};
        }
      </style>
      ${svg}
    `;
  }
}
