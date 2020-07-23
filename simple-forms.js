class Form {
  constructor() {
    this.formName = '';
    this.formId = 0;
    this.formElements = [];
  }
}

class InputBox {
  constructor() {
    this.label = '';
    this.value = '';
    this.id = '';
  }
}

const Forms = []

function createForm() {
  const newForm = new Form();
  Forms.push(newForm);

  const form = document.createElement('form');
  form.className = 'simple-form simple-form-container';
  return form;
}

function addInputArea(form, type, inputAreaPlaceholder, labelValue) {
  const newInputArea = document.createElement('input');
  newInputArea.type = type;
  
  if (type === 'email' || type === 'password') {
    newInputArea.placeholder = inputAreaPlaceholder;
  }
  let labelInputArea;
  if (!!labelValue) {
    labelInputArea = document.createElement('label');
    labelInputArea.className = 'simple-form simple-form-input-label';
    labelInputArea.textContent = labelValue;
  }

  const inputAreaContainer = document.createElement('div');
  inputAreaContainer.className = 'simple-form simple-form-input-container';

  if (!!labelInputArea) inputAreaContainer.appendChild(labelInputArea)
  inputAreaContainer.appendChild(newInputArea)
  form.appendChild(inputAreaContainer);

  return newInputArea;
}

function addStyle(item, styles) {
  item.className = item.className.concat(' ', styles);
}



// This id determines where the form will be placed.
function addFormToPage(id, form) {
  document.querySelector(`#${id}`).appendChild(form);
}

// const formsOnPage = document.querySelectorAll('.simple-form');
// console.log(formsOnPage);


// Input - Textboxes, Password, Email...
// Dropdown
// Checkbox
// Submit

