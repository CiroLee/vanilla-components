const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    :host {
      display: inline-flex;
    }
    :host(.block) {
      display:flex;
    }
    button[data-color="danger"] {
      --color: var(--danger-color);
    }
    button[data-color="warning"] {
      --color: var(--warning-color);
    }
    button {
      --color: var(--primary-color);
      width: 100%;
      display: inherit;
      border: 0;
      justify-content: center;
      align-items: center;
      gap: 4px;
      background-color: var(--color);
      color: white;
      font-size: 14px;
      padding: 0 16px;
      height: 32px;
      border-radius: 4px;
      transition-property: background-color,filter;
      transition-duration: 0.2s;
      box-sizing: border-box;
      &:disabled {
        cursor: not-allowed;
        background-color: color-mix(in oklch, var(--color) 75%, white 25%);
      }
      &:not(:disabled):hover {
        background-color: color-mix(in oklch, var(--color) 90%, black 10%);
      }
      &:not(:disabled):active {
        background-color: color-mix(in oklch, var(--color) 90%, black 20%);
      }
      &:focus-visible {
        outline: 2px solid color-mix(in oklch, var(--color) 90%, white 60%);
        outline-offset: 2px;
      }
      &:where([data-variant="outline"],[data-variant="ghost"]) {
        background-color: transparent;
        color: var(--color);
        &:not(:disabled):hover {
          background-color: color-mix(in oklch, var(--color) 15%, transparent 75%);
        }
        &:not(:disabled):active {
          background-color: color-mix(in oklch, var(--color) 25%, transparent 75%);
        }
      }
      &[data-variant="outline"] {
        border: 1px solid color-mix(in oklch, var(--color) 60%, white 40%);
        &:not(:disabled):hover {
          background-color: color-mix(in oklch, var(--color) 16%, white 0%);
        }
        &:not(:disabled):active {
          background-color: color-mix(in oklch, var(--color) 26%, white 2%);
        }
      }

    }
  </style>
  <button part="button"><slot></slot></button>
`;

export default template;
