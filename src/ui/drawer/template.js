const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>
    :host {
      --width: 22%;
    }
    .drawer {
      padding: 16px;
      border: 0;
      outline: 0;
      max-height: none;
      max-width: none;
      box-sizing: border-box;
      transition-property: translate, opacity, overlay, display;
      transition-duration: 200ms;
      transition-behavior: allow-discrete;
      transition-timing-function: ease-in-out;
      --backdrop-shadow: rgb(0 0 0 / 6%);

      &[data-overlay="blur"]::backdrop {
        backdrop-filter: blur(4px);
      }
    }
    @media (width < 640px) {
      :host {
        --width: 80%;
      }
    }
    .drawer[open] {
      translate: 0 0;
    }
    .drawer[data-placement="right"]:not([open]) {
      translate: 100% 0;
    }
    .drawer[data-placement="left"]:not([open]) {
      translate: -100% 0;
    }
    .drawer[data-placement="top"]:not([open]) {
      translate: 0 -100%;
    }
    .drawer[data-placement="bottom"]:not([open]) {
      translate: 0 100%;
    }
    .drawer::backdrop {
      background-color: rgb(0 0 0 / 40%);
      opacity: 0;
      transition: opacity 150ms ease-in-out allow-discrete;
    }
    .drawer[data-placement="left"], .drawer[data-placement="right"] {
      width: var(--width);
      height: 100%;
    }
    .drawer[data-placement="top"], .drawer[data-placement="bottom"] {
      width: 100%;
      height: 30%;
    }
    .drawer[data-placement="left"] {
      inset: 0 auto 0 0;
      box-shadow: 6px 0 12px var(--backdrop-shadow);
    }
    .drawer[data-placement="right"] {
      inset: 0 0 0 auto;
      box-shadow: -6px 0 12px var(--backdrop-shadow);
    }
    .drawer[data-placement="top"] {
      inset: 0 auto auto 0;
      box-shadow: 0 6px 12px var(--backdrop-shadow);
    }
    .drawer[data-placement="bottom"] {
      inset: auto auto 0 auto;
      box-shadow: 0 -6px 12px var(--backdrop-shadow);
    }
    .drawer[open]::backdrop {
      opacity: 1;
    }
    @starting-style {
      .drawer[open]::backdrop {
        opacity: 0;
      }
      .drawer[data-placement="right"][open] {
        translate: 100% 0;
      }
      .drawer[data-placement="left"][open] {
        translate: -100% 0;
      }
      .drawer[data-placement="top"][open] {
        translate: 0 -100%;
      }
      .drawer[data-placement="bottom"][open] {
        translate: 0 100%;
      }
    }
  </style>
  <dialog class="drawer" part="drawer" role="drawer" data-placement="right">
    <slot></slot>
  </dialog>
`;

export default template;
