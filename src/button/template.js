const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    :host {
      display: inline-flex;
      --primary-color: #3b5bdb;
      --primary-active-color: #364fc7;
    }
    :host(.block) {
      display:flex;
    }
    button {
      width: 100%;
      display: inherit;
      border: 0;
      justify-content: center;
      align-items: center;
      gap: 4px;
      background-color: var(--primary-color);
      color: white;
      font-size: 14px;
      padding: 0 16px;
      height: 32px;
      border-radius: 4px;
      transition: background-color 0.2s;
      &:disabled {
        cursor: not-allowed;
        background-color: color-mix(in srgb, var(--primary-color) 90%, transparent 40%);
      }
      &:not(:disabled):hover {
        background-color: color-mix(in srgb, var(--primary-color) 90%, transparent 20%);
      }
      &:not(:disabled):active {
        background-color: var(--primary-active-color);
      }
    }
  </style>
  <button part="button"><slot></slot></button>
`;

export default template;
