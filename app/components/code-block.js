class CodeBlock extends HTMLElement {
  static {
    customElements.define('code-block', CodeBlock);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['language'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    if (name === 'language') {
      this.#render(newValue);
    }
  }
  #render(language) {
    let code = this.innerHTML;
    if (language === 'html') {
      code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    this.shadowRoot.innerHTML /* html */ = `
    <style>
    @import url(https://cdn.jsdelivr.net/npm/syntax-highlight-element@latest/dist/themes/prettylights.min.css);
    .code-block {
      width: 60%;
      border-radius: 6px;
      margin-inline: auto;
      font-size: 14px;
      white-space: pre;
      display: block;
      padding: 12px;
    }

    </style>
    <syntax-highlight class="code-block" language="${language}">${code}</syntax-highlight>`;
  }
}
