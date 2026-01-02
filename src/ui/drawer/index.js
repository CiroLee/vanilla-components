import template from './template.js';

class VaDrawer extends HTMLElement {
  #drawerEl;
  static {
    customElements.define('va-drawer', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#drawerEl = this.shadowRoot.querySelector('.drawer');
  }
  static get observedAttributes() {
    return ['placement', 'show', 'overlay'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'show') {
      this.open();
    } else if (name === 'overlay') {
      this.#updateOverlay(newValue);
    } else if (name === 'placement') {
      this.#updatePosition(newValue);
    }
  }
  connectedCallback() {
    this.#drawerEl.addEventListener('click', this.#overlayClick.bind(this));
  }
  disconnectedCallback() {
    this.#drawerEl.removeEventListener('click', this.#overlayClick.bind(this));
  }
  set show(value) {
    if (value) {
      this.setAttribute('show', '');
    } else {
      this.removeAttribute('show');
      this.close();
    }
  }
  set placement(value) {
    this.setAttribute('placement', value);
  }
  set overlay(value) {
    this.setAttribute('overlay', value);
  }
  // 打开drawer
  open() {
    this.#drawerEl.showModal();
    this.#toggleRootScroll(false);
  }
  // 关闭modal
  close() {
    this.#drawerEl.close();
    this.#toggleRootScroll(true);
  }
  #overlayClick(e) {
    const rect = this.#drawerEl.getBoundingClientRect();
    const isInDialog = rect.top <= e.clientY && e.clientY <= rect.bottom && rect.left <= e.clientX && e.clientX <= rect.right;
    if (!isInDialog) {
      this.close();
    }
  }
  /**
   * @description 设置遮罩样式，支持blur模糊和默认两种
   * @param {'default' | 'blur'} overlay
   */
  #updateOverlay(overlay = 'default') {
    this.#drawerEl.setAttribute('data-overlay', overlay);
  }
  #toggleRootScroll(enable) {
    const root = document.querySelector(':root');
    enable ? root.removeAttribute('style') : root.setAttribute('style', 'overflow: hidden;');
  }
  #updatePosition(placement = 'right') {
    this.#drawerEl.setAttribute('data-placement', placement);
  }
}
