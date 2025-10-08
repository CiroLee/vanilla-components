class SyntaxHighlight extends HTMLElement {
  static {
    customElements.define('syntax-highlight', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['language', 'ignore-str', 'code'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'language') {
      this.language = newValue;
    }
    if (name === 'ignore-str') {
      this.ignoreStr = newValue;
    }
    this.#render();
  }
  set ignore(value) {
    this.setAttribute('ignore-str', value);
  }
  set code(value) {
    this.innerHTML = value;
    this.#render(this.getAttribute('language'));
  }
  #removeChars(str, arr) {
    // 1. 剔除 arr 中的字符
    const escapedChars = arr.map((char) => char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const charsRegex = new RegExp(escapedChars.join('|'), 'g');
    const withoutChars = str.replace(charsRegex, '');

    // 2. 去除 < 和 > 两侧的空格
    const trimmedBrackets = withoutChars.replace(/\s*([<>])\s*/g, '$1');

    return trimmedBrackets;
  }
  #render() {
    let code = this.innerHTML;
    if (this.ignoreStr) {
      let _ignoreStr = this.ignoreStr.split(',');
      code = this.#removeChars(code, _ignoreStr);
    }
    if (this.language === 'html') {
      code = code.replaceAll(/=""/g, '');
    }

    const html = hljs.highlight(code, { language: this.language }).value;
    console.log(this.language);

    this.shadowRoot.innerHTML /* html */ = `
    <style>
    .code-block {
      font-size: 14px;
      white-space: pre;
      display: block;
      padding: 12px;
      color: white;
      background: #0d1117;
      pre {
        margin: 0;
      }
    }
    .hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}
    </style>
    <div class="code-block"><pre language="${this.language}"><code>${html}</code></pre></div>`;
  }
}
