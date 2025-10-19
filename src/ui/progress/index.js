import template from './template.js';

class VaProgress extends HTMLElement {
  #max = 100;
  #value = 0;
  #indicator;
  #progress;
  static {
    customElements.define('va-progress', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#indicator = this.shadowRoot.querySelector('.progress-indicator');
    this.#progress = this.shadowRoot.querySelector('.progress');
  }
  static get observedAttributes() {
    return ['value', 'max', 'color', 'size'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'max' || name === 'value') {
      name === 'max' && (this.#max = Number(newValue));
      name === 'value' && (this.#value = Number(newValue));
      this.#updateProgress(this.#value, this.#max);
    } else if (name === 'color') {
      this.#updateColor(newValue);
    } else if (name === 'size') {
      this.#updateSize(newValue);
    }
  }
  get value() {
    return this.#value;
  }
  set value(value) {
    if (typeof value === 'number' && !isNaN(value)) {
      this.setAttribute('value', value);
    }
  }
  get max() {
    return this.#max;
  }
  set max(max) {
    if (typeof max === 'number' && !isNaN(value)) {
      this.setAttribute('max', max);
    }
  }
  /**
   * @description 设置进度条尺寸
   * @param {'sm'| 'md' | 'lg'} size
   * @example
   * document.querySelector('va-progress').size = 'lg';
   */
  set size(value) {
    this.setAttribute('size', value);
  }
  /**
   * @description 设置进度条主题颜色
   * @param {'primary' | 'success' | 'warning' | 'danger'} color
   * @example
   * document.querySelector('va-progress').color = 'success';
   */
  set color(color) {
    this.setAttribute('color', color);
  }
  #updateProgress(value, max) {
    const progress = (value / max) * 100;
    this.#indicator.style.translate = `-${100 - progress}% 0`;
  }
  /**
   * @description 更新进度条主题颜色
   * @param {'primary' | 'success' | 'warning' | 'danger'} color
   */
  #updateColor(color = 'primary') {
    this.#indicator.setAttribute('data-color', color);
  }
  /**
   * @description 更新进度条尺寸
   * @param {'sm' | 'md' | 'lg'} size
   */
  #updateSize(size = 'md') {
    this.#progress.setAttribute('data-size', size);
  }
}
