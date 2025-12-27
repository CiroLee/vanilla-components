const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    :host {
      display: block;
    }
    .input {
      position: relative;
      display: flex;
      gap: 8px;
      width: 100%;
      height: 36px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 0 8px;
      overflow: hidden;
      box-sizing: border-box;
      &:has(input:focus-visible) {
        outline: 2px solid color-mix(in oklch, var(--primary-color) 90%, white 60%);
        outline-offset: 2px;
      }
      &:has(input:read-only) {
        background-color: var(--readonly-color);
      }
      &:has(input:disabled) {
        cursor: not-allowed;
        input {
          cursor: not-allowed;
          color: color-mix(in oklch, var(--black-color) 40%, white 60%);
        }
        background-color: var(--disabled-color);
      }
    }
    .input[data-size="sm"] {
      height: 28px;
      border-radius: 4px;
      padding: 0 6px;
      gap: 6px;
    }
    .input[data-size="lg"] {
      height: 44px;
      border-radius: 8px;
      input {
        font-size: 16px;
      }
    }
    input {
      border: 0;
      outline: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      box-sizing: border-box;
      font-size: 14px;
      flex: 1;
    }
    ::slotted(*) {
      display: flex;
      align-items: center;
      padding: 12px;
    }
  </style>
  <div class="input">
    <slot name="start"></slot>
    <input type="text" />
    <slot name="end"></slot>
  </div>
`;

export default template;
