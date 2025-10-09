const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    button {
      width: 28px;
      height: 28px;
      outline: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border-radius: 4px;
      border: 1px solid rgb(255 255 255 / 60%);
      padding: 0;
      color: white;
      font-size: 16px;
      opacity: 0.6;
      transition: opacity .2s ease;
      &:hover {
        opacity: 1;
      }
    }
    svg.hidden {
      display: none;
    }
  </style>
  <button part="copy-button" aria-label="copy code">
    <svg class="copy" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
    <svg class="checked hidden" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
  </button>
`;
class CopyButton extends HTMLElement {
  #button;
  #copyEl;
  #checkedEl;
  #timer;
  text = '';
  static {
    customElements.define('copy-button', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#button = this.shadowRoot.querySelector('button');
    this.#copyEl = this.shadowRoot.querySelector('.copy');
    this.#checkedEl = this.shadowRoot.querySelector('.checked');
  }

  static get observedAttributes() {
    return ['text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'text') {
      this.text = newValue;
    }
  }

  connectedCallback() {
    this.#button.addEventListener('click', this.#handleClick.bind(this));
  }
  disconnectedCallback() {
    this.#button.removeEventListener('click', this.#handleClick.bind(this));
  }
  set text(value) {
    this.text = value;
  }
  async #handleClick() {
    await navigator.clipboard.writeText(this.text);
    this.#copyEl.classList.add('hidden');
    this.#checkedEl.classList.remove('hidden');
    if (this.#timer) {
      clearTimeout(this.#timer);
    }
    this.#timer = setTimeout(() => {
      this.#copyEl.classList.remove('hidden');
      this.#checkedEl.classList.add('hidden');
    }, 2000);
  }
}
