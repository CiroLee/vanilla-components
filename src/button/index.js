import template from './template.js';

class VaButton extends HTMLElement {
  #button;
  #handleClick;
  static {
    customElements.define('va-button', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.tplCloned = template.content.cloneNode(true);
    this.shadowRoot.appendChild(this.tplCloned);
    this.#button = this.shadowRoot.querySelector('button');
  }

  connectedCallback() {
    this.#addEventListeners();
  }
  disconnectedCallback() {
    this.#removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') {
      this.#updateDisabled();
    } else if (name === 'block') {
      this.#updateBlock();
    } else if (name === 'variant') {
      this.#updateVariant(newValue);
    } else if (name === 'color') {
      this.#updateColor(newValue);
    }
  }
  #addEventListeners() {
    this.#handleClick = (e) => {
      if (!this.disabled) {
        this.dispatchEvent(
          new CustomEvent('onButtonClick', {
            bubbles: true,
            composed: true,
            detail: {
              originalEvent: e,
            },
          }),
        );
      }
    };

    this.#button.addEventListener('click', this.#handleClick);
  }
  #removeEventListeners() {
    if (this.#button && this.#handleClick) {
      this.#button.removeEventListener('click', this.#handleClick);
    }
  }

  static get observedAttributes() {
    return ['disabled', 'block', 'color', 'variant'];
  }

  get disabled() {
    return this.#button.disabled;
  }
  set disabled(value) {
    if (value) {
      this.#button.setAttribute('disabled', '');
      this.#button.setAttribute('aria-disabled', 'true');
    } else {
      this.#button.removeAttribute('disabled');
      this.#button.removeAttribute('aria-disabled');
    }
  }
  get block() {
    return this.hasAttribute('block');
  }
  set variant(variant) {
    this.#updateVariant(variant);
  }
  set color(color) {
    this.#updateColor(color);
  }
  set block(value) {
    value ? this.setAttribute('block', '') : this.removeAttribute('block');
  }
  #updateBlock() {
    this.classList.toggle('block', this.hasAttribute('block'));
  }
  #updateDisabled() {
    this.#button.disabled = this.hasAttribute('disabled');
    this.#button.setAttribute('aria-disabled', this.hasAttribute('disabled'));
  }
  /**
   *
   * @param {'solid' | 'outline'} variant
   */
  #updateVariant(variant = 'solid') {
    this.#button.setAttribute('data-variant', variant);
  }
  #updateColor(color) {
    this.#button.setAttribute('data-color', color);
  }
}
