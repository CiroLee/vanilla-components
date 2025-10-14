const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    :host {
      display: inline-flex;
    }
    .switch {
      display: inline-flex;
      align-items: center;
    }
    .switch-button[data-size="sm"] {
      --width: 36px;
      --height: 20px;
      & + label {
        font-size: 14px
      };
    }
    .switch-button[data-size="lg"] {
      --width: 52px;
      --height: 28px;
      & + label {
        font-size: 18px;
      }
    }
    .switch-button:has(input:focus-visible) {
      outline: 2px solid color-mix(in oklch, var(--primary-color) 90%, white 60%);
      outline-offset: 2px;
    }
    .switch-button {
      --width: 44px;
      --height: 24px;
      --padding: 2px;
      width: var(--width);
      height: var(--height);
      display: inline-block;
      border-radius: calc(infinity * 1px);
      background-color: var(--inactive-bg-color);
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      outline: 0;
      border: 0;
      input {
        position: absolute;
        inset: 0;
        margin: 0;
        padding: 0;
        opacity: 0;
        z-index: 1;
        cursor: pointer;
      }
      .indicator {
        position: absolute;
        display: flex;
        align-items: center;
        inset: 0;
        padding: var(--padding);
        transition: background-color 0.15s linear;
        &::before {
          content: '';
          width: calc(var(--height) - var(--padding) * 2);
          height: calc(var(--height) - var(--padding) * 2);
          border-radius: 50%;
          position: absolute;
          background-color: white;
          transition: translate 0.15s linear;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
      }
      input:checked + .indicator {
        background-color: var(--primary-color);
        &::before {
          translate: calc(var(--height) - var(--padding) * 2) 0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
      }
      input:disabled {
        cursor: not-allowed;
        & + .indicator::before {
          background-color: color-mix(in oklch, white 98%, black 2%);
        }
        &:checked + .indicator {
          background-color: color-mix(in oklch, var(--primary-color) 80%, white 20%);
        }
      }
    }
    .switch-button:has(input:disabled) {
      background-color: var(--disabled-bg-color);
      & + label {
        cursor: not-allowed;
        color: var(--secondary-text-color);
      }
    }
  </style>
  <div class="switch" part="switch">
    <button class="switch-button">
      <input type="checkbox" role="switch" />
      <div class="indicator"></div>
    </button>
    <label><slot></slot></label>
  </div>
`;

export default template;
