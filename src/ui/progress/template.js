const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    :host{
      display: block;
    }
    .progress {
      position: relative;
      height: 8px;
      border-radius: calc(infinity * 1px);
      background-color: var(--inactive-color);
      overflow: hidden;
    }
    .progress[data-size="sm"] {
      height: 4px;
    }
    .progress[data-size="lg"] {
      height: 12px;
    }
    .progress-indicator {
      height: 100%;
      translate: -100% 0;
      background-color: var(--primary-color);
    }
    .progress-indicator[data-color="success"] {
      background-color: var(--success-color);
    }
    .progress-indicator[data-color="danger"] {
      background-color: var(--danger-color);
    }
    .progress-indicator[data-color="warning"] {
      background-color: var(--warning-color);
    }
  </style>
  <div role="progress" part="progress" class="progress">
    <div class="progress-indicator" part="progress-indicator"></div>
  </div>
`;

export default template;
