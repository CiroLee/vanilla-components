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
    this.#addClickListener();
  }
  disconnectedCallback() {
    this.#removeClickListener();
  }
  static get observedAttributes() {
    return ['disabled', 'block', 'color', 'variant', 'size', 'rounded', 'loading', 'type', 'as-icon'];
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
      case 'as-icon':
        this.#updateAsIcon();
        break;
    }
  }
  #addClickListener() {
    this.#handleClick = (e) => {
      if (!this.disabled && !this.hasAttribute('loading')) {
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
  #removeClickListener() {
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
  /**
   * @description 通过实例设置按钮变体
   * @param {'solid' | 'outline'} variant
   * @example
   * document.getElementById('va-button').variant = 'outline';
   */
  set variant(variant) {
    this.setAttribute('variant', variant);
  }
  /**
   * @description 通过实例设置按钮颜色
   * @param {'primary' | 'success' | 'warning' | 'danger'} color
   * @example
   * document.getElementById('va-button').color = 'success';
   */
  set color(color) {
    this.setAttribute('color', color);
  }
  /**
   * @description 通过实例设置按钮大小
   * @param {'sm' | 'md' | 'lg'} size
   * @example
   * document.getElementById('va-button').size = 'lg';
   */
  set size(size) {
    this.setAttribute('size', size);
  }
  /**
   * @description 通过实例设置按钮圆角
   * @param {'sm' | 'md' | 'lg' | 'full' | 'none'} rounded
   * @example
   * document.getElementById('va-button').rounded = 'lg';
   */
  set rounded(rounded) {
    this.setAttribute('rounded', rounded);
  }
  /**
   * @description 通过实例设置按钮是否为图标按钮
   * @param {boolean} value
   * @example
   * document.getElementById('va-button').asIcon = true;
   */
  set asIcon(value) {
    this.setAttribute('as-icon', value);
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
  /**
   * @description 显示加载状态
   */
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
  /**
   * @description 更新button是否为图标按钮
   */
  #updateAsIcon() {
    this.#button.setAttribute('data-icon', this.hasAttribute('as-icon'));
  }
}
