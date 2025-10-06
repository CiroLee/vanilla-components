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
    button[data-color="success"] {
      --color: var(--success-color);
    }
    button[data-size="sm"] {
      height: 24px;
      font-size: 12px;
      padding: 0 10px;
    }
    button[data-size="lg"] {
      height: 40px;
      font-size: 16px;
    }
    button[data-rounded="sm"] {
      border-radius: 4px;
    }
    button[data-rounded="lg"] {
      border-radius: 10px;
    }
    button[data-rounded="full"] {
      border-radius:calc(infinity * 1px);
    }
    button[data-rounded="none"] {
      border-radius: 0;
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
      border-radius: 6px;
      transition-property: background-color,scale;
      transition-duration: 0.2s;
      box-sizing: border-box;
      &[data-loading]{
        pointer-events: none;
        background-color: color-mix(in oklch, var(--color) 75%, white 25%);
      }
      &:disabled {
        cursor: not-allowed;
        background-color: color-mix(in oklch, var(--color) 65%, white 35%);
      }
      &:not(:disabled):hover {
        background-color: color-mix(in oklch, var(--color) 90%, black 10%);
      }
      &:not(:disabled):active {
        scale: 0.96;
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
        &:disabled {
          background-color: transparent;
          color: color-mix(in oklch, var(--color) 65%, white 35%);
          border-color: color-mix(in oklch, var(--color) 40%, white 60%);
        }
      }
      &[data-variant="outline"] {
        border: 1px solid color-mix(in oklch, var(--color) 60%, white 40%);
        &:not(:disabled):hover {
          background-color: color-mix(in oklch, var(--color) 16%, white 0%);
        }
      }

    }
  </style>
  <button part="button"><slot></slot></button>
`;

export default template;
