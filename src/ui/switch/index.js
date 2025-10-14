import template from './template.js';

class VaSwitch extends HTMLElement {
  #switchButton;
  #inputEl;
  #labelEl;
  #handleChange;
  static {
    customElements.define('va-switch', VaSwitch);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#switchButton = this.shadowRoot.querySelector('.switch-button');
    this.#inputEl = this.shadowRoot.querySelector('input');
    this.#labelEl = this.shadowRoot.querySelector('label');
  }
  static get observedAttributes() {
    return ['checked', 'size', 'id', 'name', 'disabled'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'size') {
      this.#updateSize(newValue);
    } else if (name === 'checked') {
      this.#updateChecked();
    } else if (name === 'id') {
      this.#inputEl.id = newValue;
      this.#labelEl.setAttribute('for', newValue);
    } else if (name === 'name') {
      this.#inputEl.name = newValue;
    } else if (name === 'disabled') {
      this.#updateDisabled();
    }
  }
  connectedCallback() {
    this.#addEventListeners();
  }
  disconnectedCallback() {
    this.#removeEventListeners();
  }
  /**
   * @description 获取禁用
   * @returns {boolean}
   */
  get disabled() {
    return this.#inputEl.disabled;
  }
  /**
   * @description 设置禁用
   * @param {boolean} value
   */
  set disabled(value) {
    value ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }
  /**
   * @description 设置id，和label绑定时必须传入唯一值
   * @param {string} id
   */
  set id(value) {
    this.setAttribute('id', value);
  }
  /**
   * @description 设置name
   * @param {string} name
   */
  set name(value) {
    this.setAttribute('name', value);
  }
  /**
   * @description 获取switch状态
   * @param {boolean} value
   */
  set checked(value) {
    value ? this.setAttribute('checked', '') : this.removeAttribute('checked');
  }
  /**
   * @description 更新switch尺寸
   * @param {'sm' | 'md' | 'lg'} size
   */
  #updateSize(size = 'md') {
    this.#switchButton.setAttribute('data-size', size);
  }
  #updateChecked() {
    this.hasAttribute('checked') ? this.#inputEl.setAttribute('checked', '') : this.#inputEl.removeAttribute('checked');
  }
  #addEventListeners() {
    this.#handleChange = (e) => {
      if (!this.disabled) {
        this.dispatchEvent(
          new CustomEvent('va-switch-change', {
            bubbles: true,
            composed: true,
            detail: {
              source: 'va-switch',
              originalEvent: e,
              checked: e.target.checked,
            },
          }),
        );
      }
    };
    this.#inputEl.addEventListener('change', this.#handleChange);
  }
  #removeEventListeners() {
    this.#inputEl.removeEventListener('change', this.#handleChange);
  }
  #updateDisabled() {
    this.#inputEl.disabled = this.hasAttribute('disabled');
    this.#inputEl.setAttribute('aria-disabled', this.hasAttribute('disabled'));
  }
}
