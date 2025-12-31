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
        .content[data-placement="top-center"] {
          transform-origin: bottom center;
        }
        .content[data-placement="top-left"] {
          transform-origin: bottom left;
        }
        .content[data-placement="top-right"] {
          transform-origin: bottom right;
        }
        .content[data-placement="right-top"] {
          transform-origin: top left;
        }
        .content[data-placement="right-center"] {
          transform-origin: left center;
        }
        .content[data-placement="right-bottom"] {
          transform-origin: bottom left;
        }
        .content[data-placement="bottom-left"] {
          transform-origin: top left;
        }
        .content[data-placement="bottom-center"] {
          transform-origin: top center;
        }
        .content[data-placement="bottom-right"] {
          transform-origin: top right;
        }
        .content[data-placement="left-top"] {
          transform-origin: top right;
        }
        .content[data-placement="left-center"] {
          transform-origin: right center;
        }
        .content[data-placement="left-bottom"] {
          transform-origin: bottom right;
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
        <div class="content" data-state="closed" data-placement="top-center"></div>
      </div>
  `;
export default template;
