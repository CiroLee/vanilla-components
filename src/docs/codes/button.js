export const colorCode = `<va-button color="primary">Primary</va-button>
<va-button color="success">Success</va-button>
<va-button color="warning">Warning</va-button>
<va-button color="danger">Danger</va-button>`;

export const variantCode = `<va-button variant="solid">Solid</va-button>
<va-button variant="outline">Outline</va-button>
<va-button variant="ghost">Ghost</va-button>`;

export const roundedCode = `<va-button rounded="full">Full</va-button>
<va-button rounded="sm">Small</va-button>
<va-button rounded="md">Medium</va-button>
<va-button rounded="lg">Large</va-button>
<va-button rounded="none">None</va-button>`;

export const sizeCode = `<va-button size="sm">Small</va-button>
<va-button size="md">Medium</va-button>
<va-button size="lg">Large</va-button>`;
export const disabledCode = `<va-button disabled>Primary</va-button>
<va-button disabled color="warning">Warning</va-button>
<va-button disabled color="danger">Danger</va-button>
<va-button disabled variant="outline">Outline</va-button>
<va-button disabled variant="ghost">Ghost</va-button>`;
export const asIconCode = `<!-- use iconify-icon  -->
<script src="https://cdn.jsdelivr.net/npm/iconify-icon@3.0.0/dist/iconify-icon.min.js" defer></script>

<va-button as-icon>
  <iconify-icon icon="lucide:home" width="20"></iconify-icon>
</va-button>
<va-button as-icon variant="outline">
  <iconify-icon icon="lucide:home" width="20"></iconify-icon>
</va-button>
<va-button as-icon variant="ghost">
  <iconify-icon icon="lucide:home" width="20"></iconify-icon>
</va-button>`;
export const loadingCode = `<va-button loading>
  <iconify-icon icon="svg-spinners:90-ring" width="18"></iconify-icon>
  Loading...
</va-button>`;
