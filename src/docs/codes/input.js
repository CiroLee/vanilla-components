export const defaultCode = `<va-input name="default-input" placeholder="default input" />`;

export const sizeCode = `<va-input name="small" placeholder="small" size="sm"></va-input>
<va-input name="medium" placeholder="medium" size="md"></va-input>
<va-input name="large" placeholder="large" size="lg"></va-input>`;

export const readonlyCode = `<va-input name="readonly-input" readonly value="readonly input" />`;
export const disabledCode = `<va-input name="disabled-input" disabled value="disabled" />`;

export const withIconCode = `<va-input name="userName" placeholder="start icon" class="w-80">
  <va-icon slot="start" prefix="lucide" name="user" size="18" color="gray"></va-icon>
</va-input>
<va-input name="card" placeholder="end icon" class="w-80">
  <va-icon slot="end" prefix="lucide" name="id-card" size="18" color="gray"></va-icon>
</va-input>`;
