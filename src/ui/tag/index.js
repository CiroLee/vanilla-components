import template from './template.js';

class VaTag extends HTMLElement {
  #tag;
  static {
    customElements.define('va-tag', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#tag = this.shadowRoot.querySelector('.tag');
  }

  static get observedAttributes() {
    return ['color', 'size', 'variant', 'rounded'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color') {
      this.#updateColor(newValue);
    } else if (name === 'variant') {
      this.#updateVariant(newValue);
    } else if (name === 'size') {
      this.#updateSize(newValue);
    } else if (name === 'rounded') {
      this.#updateRounded(newValue);
    }
  }
  /**
   * @description 通过实例设置tag属性
   * @param {'primary' | 'success' | 'warning' | 'danger'} color
   * @example
   * document.getElementById('va-tag').color = 'primary';
   */
  set color(value) {
    this.setAttribute('color', value);
  }
  /**
   * @description 通过实例设置tag变体
   * @param {'solid' | 'outline' | 'plain'} variant
   * @example
   * document.getElementById('va-tag').variant = 'outline';
   */
  set variant(value) {
    this.setAttribute('variant', value);
  }
  /**
   * @description 通过实例设置tag尺寸
   * @param {'sm' | 'md' | 'lg'} size
   * @example
   * document.getElementById('va-tag').size = 'lg';
   */
  set size(value) {
    this.setAttribute('size', value);
  }
  /**
   * @description 通过实例设置tag圆角
   * @param {'default' | 'full'} rounded
   * @example
   * document.getElementById('va-tag').rounded = 'full';
   */
  set rounded(value) {
    this.setAttribute('rounded', value);
  }
  /**
   * @description 更新tag颜色
   * @param {'primary' | 'success' | 'warning' | 'danger'} color
   */
  #updateColor(color) {
    this.#tag.setAttribute('data-color', color);
  }
  /**
   * @description 更新tag变体
   * @param {'solid' | 'outline'} variant
   */
  #updateVariant(variant = 'outline') {
    this.#tag.setAttribute('data-variant', variant);
  }
  /**
   * @description 更新tag尺寸
   * @param {'sm' | 'md' | 'lg'} size
   */
  #updateSize(size = 'md') {
    this.#tag.setAttribute('data-size', size);
  }
  /**
   * @description 更新tag圆角
   * @param {'default' | 'full'} rounded
   */
  #updateRounded(rounded = 'default') {
    this.#tag.setAttribute('data-rounded', rounded);
  }
}
