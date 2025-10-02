import template from "./template.js";

class NeButton extends HTMLElement {
  #button;
  #handleClick;
  static {
    customElements.define("ne-button", this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.tplCloned = template.content.cloneNode(true);
    this.shadowRoot.appendChild(this.tplCloned);
    this.#button = this.shadowRoot.querySelector("button");
  }

  connectedCallback() {
    this.#addEventListeners();
  }
  disconnectedCallback() {
    this.#removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "disabled") {
      this.#updateDisabled();
    } else if (name === "block") {
      this.#updateBlock();
    }
  }
  #addEventListeners() {
    this.#handleClick = (e) => {
      if (!this.disabled) {
        this.dispatchEvent(
          new CustomEvent("onButtonClick", {
            bubbles: true,
            composed: true,
            detail: {
              originalEvent: e,
            },
          })
        );
      }
    };

    this.#button.addEventListener("click", this.#handleClick);
  }
  #removeEventListeners() {
    if (this.#button && this.#handleClick) {
      this.#button.removeEventListener("click", this.#handleClick);
    }
  }

  static get observedAttributes() {
    return ["disabled", "block"];
  }

  get disabled() {
    return this.#button.disabled;
  }
  set disabled(value) {
    value
      ? this.setAttribute("disabled", "")
      : this.removeAttribute("disabled");
  }
  get block() {
    return this.hasAttribute("block");
  }
  set block(value) {
    value ? this.setAttribute("block", "") : this.removeAttribute("block");
  }
  #updateBlock() {
    this.classList.toggle("block", this.hasAttribute("block"));
  }
  #updateDisabled() {
    this.#button.disabled = this.hasAttribute("disabled");
  }
}
