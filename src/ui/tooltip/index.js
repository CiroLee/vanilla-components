import template from './template.js';
const DEFAULT_OFFSET = 6;
const SCALE = 0.96;
class VaTooltip extends HTMLElement {
  #contentEl;
  #triggerEl;
  #abortController;
  placement = 'top';
  #offset = DEFAULT_OFFSET;

  static {
    customElements.define('va-tooltip', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#contentEl = this.shadowRoot.querySelector('.content');
    const slot = this.shadowRoot.querySelector('slot');
    this.#triggerEl = slot.assignedElements({ flatten: true })[0];
    this.#abortController = new AbortController();
  }
  static get observedAttributes() {
    return ['content', 'placement', 'delay', 'offset'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'content') {
      this.#contentEl.textContent = newValue;
    } else if (name === 'placement' && ['top', 'bottom', 'left', 'right'].includes(newValue)) {
      this.#updatePlacement(newValue);
    } else if (name === 'delay') {
      this.style.cssText = `--tooltip-delay: ${this.#formatDelay(newValue)};`;
    } else if (name === 'offset') {
      this.#offset = Number(newValue) || DEFAULT_OFFSET;
    }
  }
  set content(content) {
    this.setAttribute('content', content);
  }
  set placement(placement) {
    this.setAttribute('placement', placement);
  }
  set delay(delay) {
    this.setAttribute('delay', delay);
  }
  set offset(offset) {
    this.setAttribute('offset', offset);
  }
  #formatDelay(delay) {
    const numericReg = /^[-+]?(?:\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
    return numericReg.test(delay) ? `${delay}ms` : delay;
  }
  set placement(placement) {
    if (['top', 'bottom', 'left', 'right'].includes(placement)) {
      this.#updatePlacement(placement);
    }
  }
  connectedCallback() {
    this.#triggerEl.addEventListener('mouseenter', this.#showTooltip.bind(this), {
      signal: this.#abortController.signal,
    });
    this.#triggerEl.addEventListener('focus', this.#showTooltip.bind(this), {
      signal: this.#abortController.signal,
    });
    this.#triggerEl.addEventListener('mouseleave', this.#closeTooltip.bind(this), {
      signal: this.#abortController.signal,
    });
    this.#triggerEl.addEventListener('blur', this.#closeTooltip.bind(this), {
      signal: this.#abortController.signal,
    });
    this.#triggerEl.addEventListener('keydown', this.#keyDown.bind(this), { signal: this.#abortController.signal });
  }
  disconnectedCallback() {
    this.#abortController.abort();
  }
  #showTooltip() {
    this.#contentEl.setAttribute('data-state', 'open');
    const triggerRect = this.#triggerEl.getBoundingClientRect();
    const contentRect = this.#contentEl.getBoundingClientRect();
    // 需要除缩放系数，确保位置正确
    switch (this.placement) {
      case 'top':
        this.#contentEl.style.cssText = `
            top: ${triggerRect.top - contentRect.height - this.#offset}px;
            left: ${triggerRect.left + triggerRect.width / 2 - contentRect.width / 2 / SCALE}px;
            `;
        break;
      case 'bottom':
        this.#contentEl.style.cssText = `
            top: ${triggerRect.bottom + this.#offset}px;
            left: ${triggerRect.left + triggerRect.width / 2 - contentRect.width / 2 / SCALE}px;
            `;
        break;
      case 'left':
        this.#contentEl.style.cssText = `
            top: ${triggerRect.top + triggerRect.height / 2 - contentRect.height / 2}px;
            left: ${triggerRect.left - contentRect.width / SCALE - this.#offset}px;
            `;
        break;
      case 'right':
        this.#contentEl.style.cssText = `
            top: ${triggerRect.top + triggerRect.height / 2 - contentRect.height / 2}px;
            left: ${triggerRect.right + this.#offset}px;
            `;
        break;
    }
  }
  #closeTooltip() {
    this.#contentEl.setAttribute('data-state', 'closed');
  }
  #keyDown(e) {
    if (e.key === 'Escape') {
      this.#closeTooltip();
    }
  }
  #updatePlacement(placement) {
    this.placement = placement;
  }
}
