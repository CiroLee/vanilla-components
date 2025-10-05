class CodeBlock extends HTMLElement {
  ignoreStr = '';
  language = '';
  static {
    customElements.define('code-block', CodeBlock);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['language', 'ignore'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'language') {
      this.language = newValue;
    }
    if (name === 'ignore') {
      this.ignoreStr = newValue;
    }
    this.#render();
  }
  set ignore(value) {
    this.setAttribute('ignore', value);
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
      console.log(_ignoreStr);
      code = this.#removeChars(code, _ignoreStr);
    }
    if (this.language === 'html') {
      code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;').replaceAll(/=""/g, '');
    }

    this.shadowRoot.innerHTML /* html */ = `
    <style>
    .code-block {
      font-size: 14px;
      white-space: pre;
      display: block;
      padding: 12px;
    }
    @layer syntax-highlight-element{syntax-highlight{white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;overflow:auto;tab-size:2;hyphens:none}}@layer syntax-highlight-element{syntax-highlight{--prettylights-bg:light-dark(#f6f8fa, #151b23);--prettylights-fg:light-dark(#1f2328, #f0f6fc);--prettylights-comment:light-dark(#59636e, #9198a1);--prettylights-constant:light-dark(#0550ae, #79c0ff);--prettylights-constant-other-reference-link:light-dark(#0a3069, #a5d6ff);--prettylights-entity:light-dark(#6639ba, #d2a8ff);--prettylights-entity-tag:light-dark(#0550ae, #7ee787);--prettylights-keyword:light-dark(#cf222e, #ff7b72);--prettylights-bold:light-dark(#f0f6fc, #f0f6fc);--prettylights-deleted-bg:light-dark(#ffebe9, #67060c);--prettylights-deleted-text:light-dark(#82071e, #ffdcd7);--prettylights-heading:light-dark(#0550ae, #1f6feb);--prettylights-inserted-bg:light-dark(#dafbe1, #033a16);--prettylights-inserted-text:light-dark(#116329, #aff5b4);--prettylights-italic:light-dark(#f0f6fc, #f0f6fc);--prettylights-string:light-dark(#0a3069, #a5d6ff);--prettylights-string-regexp:light-dark(#116329, #7ee787);--prettylights-variable:light-dark(#953800, #ffa657);color-scheme:light dark;color:var(--prettylights-fg);background-color:var(--prettylights-bg);font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;line-height:1.6}::highlight(atrule),::highlight(number),::highlight(punctuation){color:var(--prettylights-fg)}::highlight(namespace){opacity:.7}::highlight(cdata),::highlight(comment),::highlight(doctype),::highlight(prolog){color:var(--prettylights-comment)}::highlight(attr-name),::highlight(builtin),::highlight(char),::highlight(constant),::highlight(operator){color:var(--prettylights-constant)}::highlight(boolean),::highlight(property),::highlight(symbol),::highlight(tag){color:var(--prettylights-entity-tag)}::highlight(class-name),::highlight(entity),::highlight(function),::highlight(selector){color:var(--prettylights-entity)}::highlight(keyword),::highlight(rule){color:var(--prettylights-keyword)}::highlight(attr-value),::highlight(string){color:var(--prettylights-string)}::highlight(variable){color:var(--prettylights-variable)}::highlight(regex){font-weight:700;color:var(--prettylights-string-regexp)}::highlight(italic){font-style:italic;color:var(--prettylights-italic)}::highlight(bold){font-weight:700;color:var(--prettylights-bold)}::highlight(deleted){color:var(--prettylights-deleted-text);background-color:var(--prettylights-deleted-bg)}::highlight(inserted){color:var(--prettylights-inserted-text);background-color:var(--prettylights-inserted-bg)}::highlight(url){text-decoration:underline;color:var(--prettylights-constant-other-reference-link)}::highlight(important){color:var(--prettylights-heading)}::highlight(css-important){color:var(--prettylights-keyword)}::highlight(md-title){color:var(--prettylights-heading)}::highlight(md-list){color:var(--prettylights-variable)}}
    </style>
    <syntax-highlight class="code-block" language="${this.language}">${code}</syntax-highlight>`;
  }
}
