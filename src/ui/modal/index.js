import template from './template.js';

class VaModal extends HTMLElement {
  #dialog;
  #closeBtn;
  overlayClickable;
  static {
    customElements.define('va-modal', VaModal);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#dialog = this.shadowRoot.querySelector('dialog');
    this.#closeBtn = this.shadowRoot.querySelector('.modal-close');
  }

  static get observedAttributes() {
    return ['show', 'overlay', 'overlay-clickable'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'show') {
      this.open();
    }
    if (name === 'overlay') {
      this.#updateOverlay(newValue);
    }
    if (name === 'overlay-clickable') {
      this.#updateOverlayClickable(newValue);
    }
  }

  connectedCallback() {
    // 关闭按钮事件
    this.#closeBtn.addEventListener('click', this.close.bind(this));
    // 遮罩点击事件
    this.#dialog.addEventListener('click', this.#overlayClick.bind(this));
  }
  disconnectedCallback() {
    this.#closeBtn.removeEventListener('click', this.this.close.bind(this));
    this.#dialog.removeEventListener('click', this.#overlayClick.bind(this));
  }
  set show(value) {
    if (value) {
      this.setAttribute('show', '');
    } else {
      this.removeAttribute('show');
      this.close();
    }
  }
  #overlayClick(e) {
    if (!this.overlayClickable) return;
    const rect = this.#dialog.getBoundingClientRect();
    const isInDialog = rect.top <= e.clientY && e.clientY <= rect.bottom && rect.left <= e.clientX && e.clientX <= rect.right;
    // 不在dialog内点击，则关闭
    if (!isInDialog) {
      this.close();
    }
  }
  // 打开modal
  open() {
    this.#dialog.showModal();
    this.#dialog.animate(
      {
        translate: ['0 20px', '0 0'],
        opacity: [0, 1],
      },
      {
        duration: 150,
        fill: 'both',
        easing: 'ease-in',
      },
    );
    this.#dialog.animate(
      { opacity: [0, 1] },
      {
        duration: 150,
        fill: 'both',
        easing: 'ease-in',
        pseudoElement: '::backdrop',
      },
    );
  }
  // 关闭modal
  close() {
    const animations = [
      this.#dialog.animate(
        {
          translate: ['0 0', '0 20px'],
          opacity: [1, 0],
        },
        {
          duration: 150,
          fill: 'both',
          easing: 'ease-in',
        },
      ),
      this.#dialog.animate(
        { opacity: [1, 0] },
        {
          duration: 150,
          fill: 'both',
          easing: 'ease-in',
          pseudoElement: '::backdrop',
        },
      ),
    ];
    Promise.all(animations.map((ani) => ani.finished)).then(() => {
      this.removeAttribute('show');
      this.#dialog.close();
    });
  }
  /**
   * @description 设置遮罩样式，支持blur模糊和默认两种
   * @param {'default' | 'blur'} overlay
   */
  #updateOverlay(overlay = 'default') {
    this.#dialog.setAttribute('data-overlay', overlay);
  }
  #updateOverlayClickable() {
    this.overlayClickable = this.hasAttribute('overlay-clickable');
  }
}
