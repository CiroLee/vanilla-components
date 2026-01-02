export const defaultDrawerCodeHtml = `<!--- html -->
<va-drawer id="drawer">
  <h4>Title</h4>
  <div class="py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="absolute bottom-0 left-0 flex gap-3 items-center justify-end px-4 w-full h-16 border-t border-neutral-100">
    <va-action color="secondary">Cancel</va-action>
    <va-action color="primary">Confirm</va-action>
  </div>
</va-drawer>
<va-action>open drawer</va-action>`;

export const defaultDrawerCodeJs = `// js
document.querySelector('va-action').addEventListener('click', function(){
  document.getElementById('drawer').open();
});`;

export const placementDrawerCodeJs = `actionOpenDrawerTop.addEventListener('click', function () {
  drawerCom.placement = 'top';
  drawerCom.open();
});
actionOpenDrawerBottom.addEventListener('click', function () {
  drawerCom.placement = 'bottom';
  drawerCom.open();
});
actionOpenDrawerLeft.addEventListener('click', function () {
  drawerCom.placement = 'left';
  drawerCom.open();
});
actionOpenDrawerRight.addEventListener('click', function () {
  drawerCom.placement = 'right';
  drawerCom.open();
});
actionOpenDrawerBlur.addEventListener('click', function () {
  overlayDrawerCom.open();
});`;

export const blurOverlayCode = `<!--- html -->
<va-drawer id="drawer" overlay="blur">
  <h4>Title</h4>
  <div class="py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  <div class="absolute bottom-0 left-0 flex gap-3 items-center justify-end px-4 w-full h-16 border-t border-neutral-100">
    <va-action color="secondary">Cancel</va-action>
    <va-action color="primary">Confirm</va-action>
  </div>
</va-drawer>`;
