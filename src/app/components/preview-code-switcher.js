const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    .controller {
      display: flex;
      width: fit-content;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid #d3d3d3;

      button {
        --space: 3px;
        width: 68px;
        outline: 0;
        border: 0;
        height: 32px;
        padding: 0 10px;
        border-radius: 0;
        color: var(--black-color);
        background-color:  #f1f5fa;
        position: relative;
        padding: 4px;
        z-index: 1;
        cursor: pointer;

        &:after {
          content: '';
          width: calc(100% - var(--space) * 2);
          height: calc(100% - var(--space) * 2);
          position: absolute;
          top: var(--space);
          left: var(--space);
          border-radius: 4px;
          background-color: transparent;
          z-index: -1;

        }
        &.active::after {
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }
    }

    .content {
      margin-top: 8px;
      border-radius: 6px;
      border: 1px solid #d3d3d3;
      overflow: auto;
      max-height: 480px;
    }
    slot {
      display: none;
    }
    slot.active {
      display: block;
    }
    slot[name="preview"] {
      padding: 8px;
    }
  </style>
  <div class="preview-code-switcher">
    <div class="controller">
     <button name="preview">Preview</button>
     <button name="code">Code</button>
    </div>
    <div class="content">
      <slot class="active" name="preview"></slot>
      <slot name="code"></slot>
    </div>
  </div>
`;
class PreviewCodeSwitcher extends HTMLElement {
  #tplCloned;
  previewBtn;
  codeBtn;
  activeItem = '';
  static {
    customElements.define('preview-code-switcher', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.#tplCloned = template.content.cloneNode(true);
    this.shadowRoot.appendChild(this.#tplCloned);
    this.previewBtn = this.shadowRoot.querySelector('button[name="preview"]');
    this.codeBtn = this.shadowRoot.querySelector('button[name="code"]');
  }
  connectedCallback() {
    this.init();
    this.previewBtn.addEventListener('click', this.itemClick.bind(this));
    this.codeBtn.addEventListener('click', this.itemClick.bind(this));
  }

  disconnectedCallback() {
    this.previewBtn.removeEventListener('click', this.itemClick.bind(this));
    this.codeBtn.removeEventListener('click', this.itemClick.bind(this));
  }

  itemClick(e) {
    const name = e.target.name;
    this.activeItem = name;
    this.activeContent(name);
    if (name === 'preview') {
      this.previewBtn.classList.add('active');
      this.codeBtn.classList.remove('active');
    } else {
      this.previewBtn.classList.remove('active');
      this.codeBtn.classList.add('active');
    }
  }
  init() {
    this.previewBtn.classList.add('active');
    this.codeBtn.classList.remove('active');
    this.activeItem = 'preview';
    this.activeContent(this.activeItem);
  }
  activeContent(name) {
    this.shadowRoot.querySelector(`slot[name="${name}"]`).classList.add('active');
    this.shadowRoot.querySelector(`slot:not([name="${name}"])`).classList.remove('active');
  }
}
