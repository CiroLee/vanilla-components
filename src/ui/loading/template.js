const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    .loading {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(0 0 0 / 40%);
      z-index: var(--z-loading);
      opacity: 0;
    }
    .loading[data-blur] {
      backdrop-filter: blur(4px);
    }
    .text {
      color: white;
      font-size: 14px;
      &:empty {
        display: none;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      z-index: calc(var(--z-loading) + 1);
    }
    .spinner {
      width: 22px;
      height: 22px;
      border-width: 4px;
      border-color: var(--primary-color);
      border-style: solid;
      border-top-color: color-mix(in oklch, var(--primary-color) 25%, transparent 75%);
      border-radius: 50%;
      animation: spin 1s infinite linear;
    }
    @keyframes spin {
      to {
        transform: rotate(1turn);
      }
    }
  </style>
  <div aria-label="loading" class="loading" part="loading">
    <div class="content">
      <div class="spinner"></div>
      <span part="loading-text" class="text"></span>
    </div>
  </div>
`;

export default template;
