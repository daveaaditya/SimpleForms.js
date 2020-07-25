class Form {
  constructor(formName) {
    this.formName = formName;
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

function createForm(formName) {
  const newForm = new Form(formName);
  // Forms.push(newForm);

  const form = document.createElement('form');
  form.className = 'simple-form simple-form-container';
  return form;
}

function addInputArea(form, type, inputAreaPlaceholder, labelValue) {
  const newInputArea = document.createElement('input');

  if (type === 'email' || type === 'password') {
    newInputArea.type = type;
  } else {
    return;
  }
  
  if (type === 'email' || type === 'password') {
    newInputArea.placeholder = inputAreaPlaceholder;
  }

  newInputArea.className = `simple-form simple-form-input-area-${type}`

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
}

function addCheckBox(form, labelValue, labelSide) {
  const newCheckBox = document.createElement('input');
  newCheckBox.type = 'checkbox';
  newCheckBox.className = `simple-form simple-form-input-area-checkbox`;
  
  const newLabelSide = labelSide || 'left';
  const newLabel = labelValue || '';

  const checkBoxContainer = document.createElement('div')
  checkBoxContainer.className = 'simple-form simple-form-input-container';

  if (newLabel !== '') {
    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.textContent = newLabel;

    if (newLabelSide === 'right') {
      checkBoxContainer.appendChild(newCheckBox);
      checkBoxContainer.appendChild(checkBoxLabel);
    } else {
      checkBoxContainer.appendChild(checkBoxLabel);
      checkBoxContainer.appendChild(newCheckBox);
    }
  } else {
    checkBoxContainer.appendChild(newCheckBox);
  }

  form.appendChild(checkBoxContainer);
}

function addNumberPicker(form, labelValue) {
  const numberPicker = document.createElement('input');
  numberPicker.type = 'number';
  numberPicker.className = `simple-form simple-form-input-area-number`;

  let labelInputArea;
  if (!!labelValue) {
    labelInputArea = document.createElement('label');
    labelInputArea.className = 'simple-form simple-form-input-label';
    labelInputArea.textContent = labelValue;
  }

  const inputAreaContainer = document.createElement('div');
  inputAreaContainer.className = 'simple-form simple-form-input-container';

  if (!!labelInputArea) inputAreaContainer.appendChild(labelInputArea)
  inputAreaContainer.appendChild(numberPicker)
  form.appendChild(inputAreaContainer);
}

function addStyle(item, styles) {
  item.className = item.className.concat(' ', styles);
}

function addSubmitButton(form, buttonText, onClickFunction) {
  const newSubmitButton = document.createElement('input');
  newSubmitButton.type = 'submit';
  newSubmitButton.value = buttonText || '';
  newSubmitButton.className = 'simple-form simple-form-button';

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'simple-form simple-form-button-container';

  buttonContainer.appendChild(newSubmitButton);
  // Add submit div, and add styling.
  form.appendChild(buttonContainer);
  form.addEventListener('submit', onClickFunction);
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

