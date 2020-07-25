class Form {
  constructor(formName) {
    this.formName = formName;
    this.formElements = [];
  }

  addInputArea(type, inputAreaPlaceholder, labelValue) {
    const newInputArea = new InputTextArea(type, inputAreaPlaceholder, labelValue);
    this.formElements.push(newInputArea);
    // form.appendChild(inputAreaContainer);
  }

  addCheckBox(form, labelValue, labelSide) {
    const newCheckBox = new Checkbox(form, labelValue, labelSide);
    this.formElements.push(newCheckBox);
  }

  addNumberPicker(labelValue) {
    const newNumberPicker = new NumberPicker(labelValue);
    this.formElements.push(newNumberPicker);
  }

  addSubmitButton(buttonText, onClickFunction) {
    const newSubmitButton = new SubmitButton(buttonText, onClickFunction);
    this.formElements.push(newSubmitButton);
  }

  createDOMElement() {
    const form = document.createElement('form');
    form.className = 'simple-form simple-form-container';
    return form;
  }

  buildForm(id) {
    const form = this.createDOMElement();
    
    const completeForm = this.formElements.reduce(function (currentForm, formItem) {
      if (formItem.constructor.name === 'SubmitButton') {
        currentForm.appendChild(formItem.createDOMElement(currentForm));
      } else {
        currentForm.appendChild(formItem.createDOMElement());
      }

      return currentForm;
    }, form);

    document.querySelector(`#${id}`).appendChild(completeForm);
  }
}

class InputTextArea {
  constructor(type, inputAreaPlaceholder, labelValue) {
    this.type = type || 'email';
    this.placeholder = inputAreaPlaceholder || '';
    this.labelValue = labelValue || '';
  }

  createDOMElement() {
    const newInputArea = document.createElement('input');
    
    newInputArea.type = this.type;
    newInputArea.placeholder = this.placeholder;
  
    newInputArea.className = `simple-form simple-form-input-area-${this.type}`
  
    let labelInputArea;
    if (!!this.labelValue) {
      labelInputArea = document.createElement('label');
      labelInputArea.className = 'simple-form simple-form-input-label';
      labelInputArea.textContent = this.labelValue;
    }
  
    const inputAreaContainer = document.createElement('div');
    inputAreaContainer.className = 'simple-form simple-form-input-container';
  
    if (!!labelInputArea) inputAreaContainer.appendChild(labelInputArea)
    inputAreaContainer.appendChild(newInputArea)
    return inputAreaContainer;
  }
}

class Checkbox {
  constructor(labelValue, labelSide) {
    this.labelValue = labelValue || '';
    this.labelSide = labelSide || 'left';
  }

  createDOMElement() {
    const newCheckBox = document.createElement('input');
    newCheckBox.type = 'checkbox';
    newCheckBox.className = `simple-form simple-form-input-area-checkbox`;

    const checkBoxContainer = document.createElement('div')
    checkBoxContainer.className = 'simple-form simple-form-input-container';

    if (!!this.labelValue) {
      const checkBoxLabel = document.createElement('label');
      checkBoxLabel.textContent = this.labelValue;

      if (this.labelSide === 'right') {
        checkBoxContainer.appendChild(newCheckBox);
        checkBoxContainer.appendChild(checkBoxLabel);
      } else {
        checkBoxContainer.appendChild(checkBoxLabel);
        checkBoxContainer.appendChild(newCheckBox);
      }
    } else {
      checkBoxContainer.appendChild(newCheckBox);
    }

    return checkBoxContainer;
  }
}

class NumberPicker {
  constructor(labelValue) {
    this.labelValue = labelValue || '';
  }

  createDOMElement() {
    const numberPicker = document.createElement('input');
    numberPicker.type = 'number';
    numberPicker.className = `simple-form simple-form-input-area-number`;

    let labelInputArea;
    if (!!this.labelValue) {
      labelInputArea = document.createElement('label');
      labelInputArea.className = 'simple-form simple-form-input-label';
      labelInputArea.textContent = this.labelValue;
    }

    const inputAreaContainer = document.createElement('div');
    inputAreaContainer.className = 'simple-form simple-form-input-container';

    if (!!labelInputArea) inputAreaContainer.appendChild(labelInputArea)
    inputAreaContainer.appendChild(numberPicker)

    return inputAreaContainer;
  }
}

class SubmitButton {
  constructor (buttonText, onClickFunction) {
    this.buttonText = buttonText;
    this.onClickFunction = onClickFunction;
  }

  createDOMElement(form) {
    const newSubmitButton = document.createElement('input');
    newSubmitButton.type = 'submit';
    newSubmitButton.value = this.buttonText || '';
    newSubmitButton.className = 'simple-form simple-form-button';

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'simple-form simple-form-button-container';

    buttonContainer.appendChild(newSubmitButton);
    form.addEventListener('submit', this.onClickFunction);

    return buttonContainer;
  }
}

function createForm(formName) {
  const newForm = new Form(formName);
  return newForm;
}

function addStyle(item, styles) {
  item.className = item.className.concat(' ', styles);
}


// This id determines where the form will be placed.
function addFormToPage(id, form) {
  document.querySelector(`#${id}`).appendChild(form);
}

// Dropdown

