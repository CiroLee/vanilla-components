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
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#button = this.shadowRoot.querySelector('button');
  }

  connectedCallback() {
    this.#updateType();
    this.#addEventListeners();
  }
  disconnectedCallback() {
    this.#removeEventListeners();
  }
  static get observedAttributes() {
    return ['disabled', 'block', 'color', 'variant', 'size', 'rounded', 'loading', 'type'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'disabled':
        this.#updateDisabled();
        break;
      case 'block':
        this.#updateBlock();
        break;
      case 'variant':
        this.#updateVariant(newValue);
        break;
      case 'color':
        this.#updateColor(newValue);
        break;
      case 'size':
        this.#updateSize(newValue);
        break;
      case 'rounded':
        this.#updateRounded(newValue);
        break;
      case 'loading':
        this.#updateLoading();
        break;
    }
  }
  #addEventListeners() {
    this.#handleClick = (e) => {
      if (!this.disabled) {
        this.dispatchEvent(
          new CustomEvent('va-button-click', {
            bubbles: true,
            composed: true,
            detail: {
              source: 'va-button',
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
  get disabled() {
    return this.#button.disabled;
  }
  set disabled(value) {
    value ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }
  get block() {
    return this.hasAttribute('block');
  }
  set block(value) {
    value ? this.setAttribute('block', '') : this.removeAttribute('block');
  }
  get loading() {
    return this.hasAttribute('loading');
  }
  set loading(loading) {
    loading ? this.setAttribute('loading', '') : this.removeAttribute('loading');
  }
  set variant(variant) {
    this.setAttribute('variant', variant);
  }
  set color(color) {
    this.setAttribute('color', color);
  }
  set size(size) {
    this.setAttribute('size', size);
  }
  set rounded(rounded) {
    this.setAttribute('rounded', rounded);
  }
  #updateBlock() {
    this.classList.toggle('block', this.hasAttribute('block'));
  }
  #updateDisabled() {
    this.#button.disabled = this.hasAttribute('disabled');
    this.#button.setAttribute('aria-disabled', this.hasAttribute('disabled'));
  }
  /**
   *@description 更新button变体
   * @param {'solid' | 'outline'} variant
   */
  #updateVariant(variant = 'solid') {
    this.#button.setAttribute('data-variant', variant);
  }
  /**
   * @description 更新button颜色
   * @param {'primary' | 'success' | 'warning' | 'danger'} color
   */
  #updateColor(color) {
    this.#button.setAttribute('data-color', color);
  }
  /**
   * @description 更新button尺寸
   * @param {'sm'| 'md' | 'lg'} size
   */
  #updateSize(size = 'md') {
    this.#button.setAttribute('data-size', size);
  }
  /**
   * @description 更新button圆角
   * @param {'sm' | 'md' | 'lg' | 'none' | 'full'} rounded
   */
  #updateRounded(rounded) {
    this.#button.setAttribute('data-rounded', rounded);
  }
  #updateLoading() {
    this.#button.setAttribute('data-loading', this.hasAttribute('loading'));
    this.hasAttribute('loading') ? this.#button.setAttribute('aria-label', 'loading') : this.#button.removeAttribute('aria-label');
  }
  /**
   * @description 更新button类型
   * @param {'button' | 'submit' | 'reset'} type
   */
  #updateType(type = 'button') {
    this.#button.setAttribute('type', type);
  }
}
