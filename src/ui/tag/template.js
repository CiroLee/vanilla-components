const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    :host {
      display: inline-flex;
      height: 24px;
    }
    .tag[data-color="success"] {
      --color: var(--success-color);
    }
    .tag[data-color="warning"] {
      --color: var(--warning-color);
    }
    .tag[data-color="danger"] {
      --color: var(--danger-color);
    }
    .tag[data-variant="solid"] {
      background-color: var(--color);
      color: white;
      border: 0;
    }
    .tag[data-variant="plain"] {
      border: 0;
    }
    .tag[data-rounded="full"] {
      border-radius: calc(infinity * 1px);
    }
    :host:has(.tag[data-size="sm"]) {
      height: 20px;
      .tag {
        font-size: 12px;
        padding: 0 6px;
      }
    }
    :host:has(.tag[data-size="lg"]) {
      height: 28px;
      .tag {
        font-size: 16px;
        padding: 0 10px;
      }
    }
    .tag {
      --color: var(--primary-color);
      height: 100%;
      padding: 0 8px;
      border-radius: 4px;
      display: inline-flex;
      gap: 4px;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      box-sizing: border-box;
      color: var(--color);
      background-color: color-mix(in oklch, var(--color) 10%, white 90%);
      border: 1px solid color-mix(in oklch, var(--color) 60%, white 40%);
    }
  </style>
  <div class="tag" part="tag"><slot></slot></div>
`;

export default template;
