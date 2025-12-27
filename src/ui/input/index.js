import template from './template.js';
const inputAttrs = ['name', 'value', 'type', 'placeholder', 'disabled', 'readonly', 'required', 'min', 'max', 'minlength', 'maxlength', 'pattern', 'step', 'autocomplete'];

class VaInput extends HTMLElement {
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
    return [...inputAttrs, 'size'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (inputAttrs.includes(name)) {
      this.#inputEl.setAttribute(name, newValue || '');
    } else if (name === 'size') {
      this.#updateSize(newValue);
    }
  }
  get value() {
    return this.#inputEl.value;
  }
  /**
   * @description 通过实例设置input大小
   * @param {'sm' | 'md' | 'lg'} size
   * @example
   * document.getElementById('va-input').size = 'lg';
   */
  set size(size) {
    this.setAttribute('size', size);
  }
  /**
   * @description 通过实例设置input的name属性
   * @param {string} string
   * @example
   * document.getElementById('va-input').name = 'name';
   */
  set name(value) {
    this.setAttribute('name', value);
  }
  /**
   * @description 通过实例设置input的value属性
   * @param {string | number | Date} value
   * @example
   * document.getElementById('va-input').value = 123;
   */
  set value(value) {
    this.setAttribute('value', value);
  }
  /**
   * @description 通过实例设置input是否可读
   * @param {boolean} readonly
   * @example
   * document.getElementById('va-input').readonly = true;
   */
  set readonly(value) {
    this.setAttribute('readonly', value);
  }
  /**
   * @description 通过实例设置input的disabled属性
   * @param {boolean} readonly
   * @example
   * document.getElementById('va-input').disabled = true;
   */
  set disabled(value) {
    this.setAttribute('disabled', value);
  }
  /**
   * @description 通过实例设置input的type属性
   * @param type
   * @example
   * document.getElementById('va-input').type = 'password';
   */
  set type(value) {
    this.setAttribute('type', value);
  }
  /**
   * @description 通过实例设置input的placeholder属性
   * @param {string} placeholder
   * @example
   * document.getElementById('va-input').placeholder = 'username';
   */
  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }
  /**
   * @description 通过实例设置input的required属性
   * @param {boolean} required
   * @example
   * document.getElementById('va-input').required = true;
   */
  set required(value) {
    this.setAttribute('required', value);
  }
  /**
   * @description 通过实例设置input的min属性
   * @param {number} min
   * @example
   * document.getElementById('va-input').min = 0;
   */
  set min(value) {
    this.setAttribute('min', value);
  }
  /**
   * @description 通过实例设置input的max属性
   * @param {number} max
   * @example
   * document.getElementById('va-input').max = 20;
   */
  set max(value) {
    this.setAttribute('max', value);
  }
  /**
   * @description 通过实例设置input的minlength属性
   * @param {number} minlength
   * @example
   * document.getElementById('va-input').minlength = 120;
   */
  set minlength(value) {
    this.setAttribute('minlength', value);
  }
  /**
   * @description 通过实例设置input的maxlength属性
   * @param {number} maxlength
   * @example
   * document.getElementById('va-input').maxlength = 240;
   */
  set maxlength(value) {
    this.setAttribute('maxlength', value);
  }
  /**
   * @description 通过实例设置input的pattern属性
   * @param {string} pattern
   * @example
   * document.getElementById('va-input').pattern = '^\d+$';
   */
  set pattern(value) {
    this.setAttribute('pattern', value);
  }
  /**
   * @description 通过实例设置input的step属性
   * @param {number} step
   * @example
   * document.getElementById('va-input').step = 2;
   */
  set step(value) {
    this.setAttribute('step', value);
  }
  /**
   * @description 通过实例设置input的autocomplete属性
   * @param {boolean} autocomplete
   * @example
   * document.getElementById('va-input').autocomplete = false;
   */
  set autocomplete(value) {
    this.setAttribute('autocomplete', value);
  }
  connectedCallback() {
    ['change', 'input', 'blur', 'focus'].forEach((eventName) => {
      let _eventHandler = this[`on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}}`];
      _eventHandler = this.#eventListener(eventName);
      this.#inputEl.addEventListener(eventName, _eventHandler);
    });
  }
  disconnectedCallback() {
    ['change', 'input', 'blur', 'focus'].forEach((eventName) => {
      const _eventHandler = this[`on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}}`];
      if (_eventHandler && this.#inputEl) {
        this.#inputEl.removeEventListener(eventName, _eventHandler);
      }
    });
  }
  #eventListener(eventName) {
    return (e) => {
      this.dispatchEvent(
        new CustomEvent(`${eventName}`, {
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
