import template from './template.js';
class VaAction extends HTMLElement {
  #action;
  #handleClick;
  static {
    customElements.define('va-action', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#action = this.shadowRoot.querySelector('button');
  }

  connectedCallback() {
    this.#addClickListener();
  }
  disconnectedCallback() {
    this.#removeClickListener();
  }
  static get observedAttributes() {
    return ['disabled', 'block', 'color', 'variant', 'size', 'rounded', 'loading', 'as-icon'];
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
          new CustomEvent('onClick', {
            bubbles: true,
            composed: true,
            detail: {
              source: 'va-action',
              originalEvent: e,
            },
          }),
        );
      }
    };

    this.#action.addEventListener('click', this.#handleClick);
  }
  #removeClickListener() {
    if (this.#action && this.#handleClick) {
      this.#action.removeEventListener('click', this.#handleClick);
    }
  }
  get disabled() {
    return this.#action.disabled;
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
   * document.getElementById('va-action').variant = 'outline';
   */
  set variant(variant) {
    this.setAttribute('variant', variant);
  }
  /**
   * @description 通过实例设置按钮颜色
   * @param {'primary' | 'success' | 'warning' | 'danger'} color
   * @example
   * document.getElementById('va-action').color = 'success';
   */
  set color(color) {
    this.setAttribute('color', color);
  }
  /**
   * @description 通过实例设置按钮大小
   * @param {'sm' | 'md' | 'lg'} size
   * @example
   * document.getElementById('va-action').size = 'lg';
   */
  set size(size) {
    this.setAttribute('size', size);
  }
  /**
   * @description 通过实例设置按钮圆角
   * @param {'sm' | 'md' | 'lg' | 'full' | 'none'} rounded
   * @example
   * document.getElementById('va-action').rounded = 'lg';
   */
  set rounded(rounded) {
    this.setAttribute('rounded', rounded);
  }
  /**
   * @description 通过实例设置按钮是否为图标按钮
   * @param {boolean} value
   * @example
   * document.getElementById('va-action').asIcon = true;
   */
  set asIcon(value) {
    this.setAttribute('as-icon', value);
  }
  #updateBlock() {
    this.classList.toggle('block', this.hasAttribute('block'));
  }
  #updateDisabled() {
    this.#action.disabled = this.hasAttribute('disabled');
    this.#action.setAttribute('aria-disabled', this.hasAttribute('disabled'));
  }
  /**
   *@description 更新action变体
   * @param {'solid' | 'outline'} variant
   */
  #updateVariant(variant = 'solid') {
    this.#action.setAttribute('data-variant', variant);
  }
  /**
   * @description 更新action颜色
   * @param {'primary' | 'success' | 'warning' | 'danger'} color
   */
  #updateColor(color) {
    this.#action.setAttribute('data-color', color);
  }
  /**
   * @description 更新action尺寸
   * @param {'sm'| 'md' | 'lg'} size
   */
  #updateSize(size = 'md') {
    this.#action.setAttribute('data-size', size);
  }
  /**
   * @description 更新action圆角
   * @param {'sm' | 'md' | 'lg' | 'none' | 'full'} rounded
   */
  #updateRounded(rounded) {
    this.#action.setAttribute('data-rounded', rounded);
  }
  /**
   * @description 显示加载状态
   */
  #updateLoading() {
    this.#action.setAttribute('data-loading', this.hasAttribute('loading'));
    this.hasAttribute('loading') ? this.#action.setAttribute('aria-label', 'loading') : this.#action.removeAttribute('aria-label');
  }
  /**
   * @description 更新action是否为图标按钮
   */
  #updateAsIcon() {
    this.#action.setAttribute('data-icon', this.hasAttribute('as-icon'));
  }
}
