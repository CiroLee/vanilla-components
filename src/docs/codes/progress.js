export const colorCode = `<va-progress value="30" color="primary"></va-progress>
<va-progress value="30" color="success"></va-progress>
<va-progress value="30" color="warning"></va-progress>
<va-progress value="30" color="danger"></va-progress>`;

export const sizeCode = `<va-progress value="30" size="sm"></va-progress>
<va-progress value="30" size="md"></va-progress>
<va-progress value="30" size="lg"></va-progress>`;

export const dynamicHtmlCode = `<!--- html --->
<div class="space-y-2">
<div class="flex items-center gap-2">
  <va-progress class="w-80" id="dynamic-progress"></va-progress>
  <span class="text-sm" id="progress-value">0%</span>
</div>
<va-action id="start-progress-btn">start</va-action>
</div>`;

export const dynamicJsCode = `// javascript
const dynamicProgress = document.getElementById('dynamic-progress');
const startProgressBtn = document.getElementById('start-progress-btn');
const progressValue = document.getElementById('progress-value');

let timer;
startProgressBtn.addEventListener('va-action-click', function() {
  if (timer) {
    clearInterval(timer);
  }
  let val = 0;
  timer = setInterval(function() {
    val += 2;
    if (val === 100) {
      clearInterval(timer);
    }
    dynamicProgress.value = val;
    progressValue.innerText = val + '%';
  }, 100);
});`;
