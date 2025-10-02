/**
 * NeHeading
 * @param {h1 | h2 | h3 | h4 | h5 | h6} as - 渲染的标签
 */
class NeHeading extends HTMLElement {
  static {
    customElements.define("ne-heading", this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["as"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "as") {
      this.render(newValue);
    }
  }

  render(as) {
    const tag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(as) ? as : "h1";
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        :host {
          display: block;
        }
        h1,h2,h3,h4,h5,h6 {
          margin: 0;
        }
        h1 {
          font-weight: 700;
          font-size: 2.5rem;
          line-height: 1.3;
          letter-spacing: 0.5px;
        }
        h2 {
          font-weight: 600;
          font-size: 2rem;
          line-height: 1.4;
          letter-spacing: 0.3px;
        }
        h3 {
          font-weight: normal;
          font-size: 1.75rem;
          line-height: 1.5;
          letter-spacing: 0.2px;
        }
        h4 {
          font-weight: normal;
          font-size: 1.5rem;
          line-height: 1.5;
          letter-spacing: 0.1px;
        }
        h5 {
          font-weight: normal;
          font-size: 1.25rem;
          line-height: 1.6;
        }
        h6 {
          font-weight: normal;
          font-size: 1rem;
          line-height: 1.5;
          letter-spacing: -0.2px;
        }
      </style>
      <${tag}><slot></slot></${tag}>
    `;
  }
}
