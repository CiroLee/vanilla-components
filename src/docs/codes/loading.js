export const defaultHtmlCode = `<!-- html -->
<va-loading></va-loading>`;
export const defaultJsCode = `// js
const openLoadingBtn = document.getElementById('button');
openLoadingBtn.addEventListener('click', function() {
  document.querySelector('va-loading').show();
  setTimeout(function() {
    document.querySelector('va-loading').hide();
  }, 2500);
});`;
