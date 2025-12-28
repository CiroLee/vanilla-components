import template from './template.js';
import { BaseInputElement } from '../shared/form.js';
import { capitalize } from '../shared/utils.js';

class VaInput extends BaseInputElement {
  #inputEl;
  #inputWrapEl;
  static {
    customElements.define('va-input', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#inputEl = this.shadowRoot.querySelector('input');
    this.#inputWrapEl = this.shadowRoot.querySelector('.input');
  }
  static get observedAttributes() {
    return [...BaseInputElement.inputAttrs, 'size'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (BaseInputElement.inputAttrs.includes(name)) {
      this.#inputEl.setAttribute(name, newValue || '');
    } else if (name === 'size') {
      this.#updateSize(newValue);
    }
  }
  get value() {
    return this.#inputEl.value;
  }
  set value(value) {
    this.#inputEl.value = value;
  }
  get name() {
    return this.getAttribute('name');
  }
  connectedCallback() {
    ['change', 'input', 'blur', 'focus'].forEach((eventName) => {
      this[`on${capitalize(eventName)}`] = this.#eventListener(eventName);
      this.#inputEl.addEventListener(eventName, this[`on${capitalize(eventName)}`]);
    });
  }
  disconnectedCallback() {
    ['change', 'input', 'blur', 'focus'].forEach((eventName) => {
      const _eventHandler = this[`on${capitalize(eventName)}`];
      if (_eventHandler && this.#inputEl) {
        this.#inputEl.removeEventListener(eventName, _eventHandler);
      }
    });
  }

  #eventListener(eventName) {
    return (e) => {
      this.dispatchEvent(
        new CustomEvent(`on${capitalize(eventName)}`, {
          bubbles: true,
          composed: true,
          detail: {
            source: 'va-input',
            originalEvent: e,
            value: e.target.value,
          },
        }),
      );
    };
  }

  #updateSize(size = 'md') {
    this.#inputWrapEl.setAttribute('data-size', size);
  }
}
