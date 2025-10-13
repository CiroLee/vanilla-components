/**
 * 当前页面导航，自动扫描当前页面具有id属性的h4标签，并生成导航列表
 */
class OnThisPage extends HTMLElement {
  static {
    customElements.define('on-this-page', this);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.#render();
    this.shadowRoot.querySelector('.content').addEventListener('click', this.#addItemClick.bind(this));
    this.#observeActive();
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector('.content').removeEventListener('click', this.#addItemClick);
  }
  #addItemClick(e) {
    const id = e.target.dataset.id;
    const el = document.getElementById(id);
    if (el) {
      document.documentElement.scrollTo({
        behavior: 'smooth',
        top: el.offsetTop - 66,
      });
    }
  }
  #render() {
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        .on-this-page {
          position: fixed;
          top: 56px;
          bottom: 0;
          width: 240px;
          display: flex;
          flex-direction: column;
          padding: 16px;
          box-sizing: border-box;
          overflow: auto;
        }

        .content {
          font-size: 14px;
        }
        .item {
          color: var(--secondary-text-color);
          cursor: pointer;
          margin-bottom: 8px !important;
          transition: color 0.2s ease;
        }
        .item:hover {
          color: var(--primary-color);
        }
        .item.active {
          color: var(--primary-color);
        }
        @media (max-width: 928px) {
          .on-this-page {
            display: none;
          }
        }
      </style>
      <div class="on-this-page">
        <div class="content">${this.#updateList()}</div>
      </div>
    `;
  }
  #updateList() {
    const h4Els = Array.from(document.querySelectorAll('h4')).filter((el) => el.id);
    return h4Els.map((el) => `<div class="item" data-id=${el.id}>${el.textContent}</div>`).join('');
  }
  #observeActive() {
    const h4Els = Array.from(document.querySelectorAll('h4')).filter((el) => el.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const el = this.shadowRoot.querySelector(`.item[data-id="${id}"]`);
          // 确保元素存在再操作
          if (el) {
            if (entry.isIntersecting) {
              // 移除其他所有项的active类
              this.shadowRoot.querySelectorAll('.item').forEach((item) => {
                item.classList.remove('active');
              });
              el.classList.add('active');
            }
          }
        });
      },
      {
        rootMargin: '-66px 0px -85% 0px', // 顶部偏移66px(header高度)，底部偏移85%使元素在视口上部时就激活
      },
    );
    h4Els.forEach((el) => observer.observe(el));
  }
}
