class VaBattery extends HTMLElement {
  #value = 100;
  #lowBatteryThreshold = 20;
  static {
    customElements.define('va-battery', VaBattery);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['value', 'charging', 'low-battery-value'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      this.#value = Number(newValue);
    } else if (name === 'low-battery-value') {
      this.#lowBatteryThreshold = Number(newValue);
    }
    this.#render(this.#value);
  }
  set value(value) {
    this.setAttribute('value', value);
  }
  set charging(value) {
    this.setAttribute('charging', value);
  }
  set lowBatteryValue(value) {
    this.setAttribute('low-battery-value', value);
  }
  #render(value) {
    if (typeof value !== 'number') {
      throw new Error('value must be a number');
    }

    const isCharging = this.hasAttribute('charging');
    const isLowBattery = value <= this.#lowBatteryThreshold;

    const charingIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 48 48"><path fill="currentColor" stroke="currentColor" stroke-linejoin="round" stroke-width="4" d="M19 4h18L26 18h15L17 44l5-19H8z"/></svg>`;
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        .battery {
          --bg: #eae8e8;
          width:36px;
          height: 20px;
          background-color: var(--bg);
          border-radius: 4px;
          position: relative;
          box-shadow: -1px 1px 2px rgba(0,0,0,0.1);
          box-sizing: border-box;
          &::after {
            content: '';
            background-color: inherit;
            position: absolute;
            top: 50%;
            translate: 0 -50%;
            width: 2px;
            height: 50%;
            right: -2px;
            border-radius: 0 2px 2px 0;

            box-sizing: border-box;
          }
          &[data-full-charged]::after{
            background-color: #00c853;
          }
          &[data-charging] {
            .battery-wrap {
              color: white;
            }
            .battery-charge {
              background-color: #00c853;
            }
          }
          &[data-low-battery] {
            .battery-wrap {
              color: white;
            }
            .battery-charge {
              background-color: #f44336;
            }
          }
        }
        .battery-wrap {
           font-size: 14px;
           color: black;
           position: absolute;
           inset: 0;
           border-radius: inherit;
           overflow: hidden;
        }
        .battery-text {
          display:flex;
          position: absolute;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }
        .battery-charge {
          width: 100%;
          height: 100%;
          background-color: white;

        }
      </style>
      <div class="battery" ${value >= 100 ? 'data-full-charged' : ''} ${isCharging ? 'data-charging' : ''} ${isLowBattery ? 'data-low-battery' : ''}>
        <div class="battery-wrap">
          <div class="battery-text">
            <div class="text">${value}</div>
            ${isCharging && value < 100 ? charingIcon : ''}
          </div>
          <div class="battery-charge" style="transform: translateX(-${100 - (value || 0)}%)"></div>
        </div>
      </div>
    `;
  }
}
