export class BaseInputElement extends HTMLElement {
  // 通用input的标签属性
  static inputAttrs = ['name', 'value', 'type', 'placeholder', 'disabled', 'readonly', 'required', 'min', 'max', 'minlength', 'maxlength', 'pattern', 'step', 'autocomplete'];
  constructor() {
    super();
  }
  set name(value) {
    this.setAttribute('name', value);
  }

  set type(value) {
    this.setAttribute('type', value);
  }
  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }
  set disabled(value) {
    this.setAttribute('disabled', value);
  }
  set readonly(value) {
    this.setAttribute('readonly', value);
  }
  set required(value) {
    this.setAttribute('required', value);
  }
  set min(value) {
    this.setAttribute('min', value);
  }
  set max(value) {
    this.setAttribute('max', value);
  }
  set minlength(value) {
    this.setAttribute('minlength', value);
  }
  set maxlength(value) {
    this.setAttribute('maxlength', value);
  }
  set pattern(value) {
    this.setAttribute('pattern', value);
  }
  set step(value) {
    this.setAttribute('step', value);
  }
  set autocomplete(value) {
    this.setAttribute('autocomplete', value);
  }
}
