const template = document.createElement('template');
template.innerHTML = /* html */ `
      <style>
        :host {
          position: relative;
        }
        .content {
          position: fixed;
          transition-property: scale, opacity, display;
          transition-behavior: allow-discrete;
          transition-timing-function: ease-in-out;
          transition-duration: 150ms;
          transition-delay: var(--tooltip-delay, 300ms);
          transform-origin: center;
          font-size: 12px;
          padding: 4px 6px;
          color: white;
          background-color: var(--black-color);
          border-radius: 6px;
          &[data-state="closed"] {
            display: none;
            opacity: 0;
            scale: 0.96;
          }
          z-index: var(--z-tooltip);
        }
        .content[data-state="open"] {
          display: block;
          opacity: 1;
          scale: 1;
        }
        @starting-style {
          .content[data-state="open"] {
            opacity: 0;
            scale: 0.96;
          }
        }
      </style>
      <div class="tooltip" part="tooltip" role="tooltip">
        <slot></slot>
        <div class="content" data-state="closed"></div>
      </div>
  `;
export default template;
