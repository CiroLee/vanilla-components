export const defaultModalCodeHtml = `<!--- html -->
<va-modal id="modal">
  <p slot="title">标题</p>
  <p slot="description">这是一段描述</p>
  <div slot="content">this is modal content...</div>
  <div slot="footer">
    <va-button id="cancel" variant="ghost">取消</va-button>
    <va-button id="confirm" color="primary">确定</va-button>
  </div>
</va-modal>`;

export const defaultModalCodeJs = `// js
document.querySelectorAll('#modal va-button').forEach((el) => {
  el.addEventListener('click', () => {
    document.getElementById('modal').show = false;
    // 也可使用close方法关闭
    // document.getElementById('modal').close()；
  });
});`;

export const blurOverlayCode = `<va-modal id="modal" overlay="blur">
  <p slot="title">标题</p>
  <p slot="description">这是一段描述</p>
  <div slot="content">this is modal content...</div>
</va-modal>
`;

export const overlayClickableCode = `<va-modal id="modal" overlay-clickable>
  <p slot="title">标题</p>
  <p slot="description">这是一段描述</p>
  <div slot="content">this is modal content...</div>
</va-modal>
`;
