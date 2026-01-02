export const defaultCode = `<va-tooltip content="This is a tooltip">
  <va-action>Hover me</va-action>
</va-tooltip>`;

export const placementCode = `<div class="flex gap-4 w-100 flex-col items-center">
  <div class="flex gap-3" name="top">
    <va-tooltip content="This is a tooltip" placement="top-left">
      <va-action class="w-20">TL</va-action>
    </va-tooltip>
    <va-tooltip content="This is a tooltip" placement="top-center">
      <va-action class="w-20">Top</va-action>
    </va-tooltip>
    <va-tooltip content="This is a tooltip" placement="top-right">
      <va-action class="w-20">TR</va-action>
    </va-tooltip>
  </div>
  <div class="flex justify-between w-full">
    <div class="flex flex-col gap-3" name="left">
      <va-tooltip content="This is a tooltip" placement="left-top">
        <va-action class="w-20">LT</va-action>
      </va-tooltip>
      <va-tooltip content="This is a tooltip" placement="left-center">
        <va-action class="w-20">Left</va-action>
      </va-tooltip>
      <va-tooltip content="This is a tooltip" placement="left-bottom">
        <va-action class="w-20">LR</va-action>
      </va-tooltip>
    </div>
    <div class="flex flex-col gap-3" name="right">
      <va-tooltip content="This is a tooltip" placement="right-top">
        <va-action class="w-20">RT</va-action>
      </va-tooltip>
      <va-tooltip content="This is a tooltip" placement="right-center">
        <va-action class="w-20">Right</va-action>
      </va-tooltip>
      <va-tooltip content="This is a tooltip" placement="right-bottom">
        <va-action class="w-20">RB</va-action>
      </va-tooltip>
    </div>
  </div>
  <div class="flex gap-3" name="bottom">
    <va-tooltip content="This is a tooltip" placement="bottom-left">
      <va-action class="w-20">BL</va-action>
    </va-tooltip>
    <va-tooltip content="This is a tooltip" placement="bottom-center">
      <va-action class="w-20">Bottom</va-action>
    </va-tooltip>
    <va-tooltip content="This is a tooltip" placement="bottom-right">
      <va-action class="w-20">BR</va-action>
    </va-tooltip>
  </div>
</div>`;

export const delayCode = `<va-tooltip content="This is a tooltip" delay="1000">
  <va-action>Hover me</va-action>
</va-tooltip>`;

export const offsetCode = `<va-tooltip content="This is a tooltip" offset="12">
  <va-action>Hover me</va-action>
</va-tooltip>`;
