import template from './template.js';

class VaLoading extends HTMLElement {
  #text;
  #loadingEl;
  static {
    customElements.define('va-loading', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['text', 'blur'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'text') {
      this.#text = newValue;
    }
  }
  /**
   * @description 设置loading文案
   * @param {string} value
   * @example
   * document.querySelector('va-loading').text = 'loading...;
   */
  set text(value) {
    this.setAttribute('text', value);
  }
  /**
   * @description 设置loading背景是否模糊
   * @param {boolean} value
   * @example
   * document.querySelector('va-loading').blur = true;
   */
  set blur(value) {
    this.setAttribute('blur', value);
  }
  #render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#loadingEl = this.shadowRoot.querySelector('.loading');
    this.#updateText(this.#text);
    this.#updateBlur();
    this.#loadingEl.animate(
      { opacity: [0, 1] },
      {
        duration: 300,
        easing: 'ease',
        fill: 'forwards',
      },
    );
  }
  #updateText(text) {
    console.log(text);
    this.shadowRoot.querySelector('.text').textContent = text;
  }
  /**
   * @description 更新背景模糊状态
   */
  #updateBlur() {
    this.hasAttribute('blur') ? this.#loadingEl.setAttribute('data-blur', '') : this.#loadingEl.removeAttribute('data-blur');
  }
  show() {
    this.#render();
  }
  hide() {
    const animation = this.#loadingEl.animate(
      { opacity: [1, 0] },
      {
        duration: 220,
        easing: 'ease',
        fill: 'forwards',
      },
    );
    animation.onfinish = () => {
      while (this.shadowRoot.firstChild) {
        this.shadowRoot.removeChild(this.shadowRoot.firstChild);
      }
    };
  }
}
