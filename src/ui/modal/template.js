const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    dialog {
      width: 480px;
      border: 1px solid var(--border-color);
      padding: 14px;
      outline: 0;
      box-shadow: 0 6px 14px -4px rgb(0 0 0 / 30%);
      border-radius: 6px;
      position: fixed;
      &::backdrop {
        background-color: rgb(0 0 0 / 40%);
      }
      &[data-overlay="blur"]::backdrop {
        backdrop-filter: blur(4px);
      }
      @media (max-width: 640px) {
        width: 82%;
      }
    }
    .modal-close {
      width: 24px;
      height: 24px;
      position: absolute;
      right: 10px;
      transition: opacity 0.2s ease;
      opacity: 0.65;
      &:hover {
        opacity: 1;
      }
      &::after,
      &::before {
        content: "";
        width: 14px;
        height: 2px;
        position: absolute;
        background-color: color-mix(in oklch, var(--black-color) 40%, white 60%);
        rotate: 45deg;
        transform-origin: center;
        inset: 50% 0 0 50%;
        translate: -50% -50%;
        border-radius: 2px;
      }
      &::after {
        rotate: -45deg;
      }
    }
    .header {
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 18px;
    }
    ::slotted([slot="description"]) {
      font-size: 14px;
      color: var(--secondary-text-color);
      margin: 8px 0 !important;
    }
    ::slotted([slot="footer"]) {
      padding-top: 16px !important;
      display: flex;
      justify-content: flex-end;
      gap: 6px;
    }
    ::slotted([slot="content"]) {
      max-height: 56vh;
      overflow-y: auto;
    }
  </style>
  <dialog part="modal">
    <div part="modal-header" class="header" aria-label="modal-header">
      <slot name="title"></slot>
      <div role="button" aria-label="close button" class="modal-close"></div>
    </div>
    <slot part="modal-description" name="description"></slot>
    <slot part="modal-content" name="content"></slot>
    <slot part="modal-footer" name="footer"></slot>
  </dialog>
`;

export default template;
