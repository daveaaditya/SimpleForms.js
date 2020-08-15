class Form {
  constructor(formName) {
    this.formName = formName;
    this.formElements = [];
    this.id = '';
    this.dropdownIdNumber = 0;
  }

  addInputArea(type, inputAreaPlaceholder, labelValue) {
    const newInputArea = new InputTextArea(type, inputAreaPlaceholder, labelValue);
    this.formElements.push(newInputArea);
  }

  addCheckbox(labelValue, labelSide) {
    const newCheckBox = new Checkbox(labelValue, labelSide);
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

  addText(text) {
    const newText = new Text(text);
    this.formElements.push(newText);
  }

  addDropdown(dropdownText, dropdownItems) {
    const newDropdown = new Dropdown(dropdownText, dropdownItems, this.dropdownIdNumber);
    this.dropdownIdNumber++;
    this.formElements.push(newDropdown);
  }

  createDOMElement() {
    const form = document.createElement('form');
    form.className = 'simple-form simple-form-container';
    return form;
  }

  addStyle(styles) {
    if (!!this.id) {
      const formElement = document.querySelector(`#${this.id}`).querySelector('form');
      formElement.className = `simple-form simple-form-container ${styles}`;
    }
  }

  buildForm(id) {
    const form = this.createDOMElement();
    this.id = id;
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

  getFormData() {
    if (!!this.id) {
      const form = document.querySelector(`#${this.id}`);
      const formInputs = form.querySelectorAll('input');

      // May need to remove submit button.
      const formValues = []
      formInputs.forEach(function(element) {
        if (element.type === 'checkbox') {
          formValues.push(element.checked);
        } else {
          formValues.push(element.value);
        }
      });

      return formValues;
    }
  }
}

class InputTextArea {
  constructor(type, inputAreaPlaceholder, labelValue) {
    this.type = type || 'text';
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

class Text {
  constructor(text) {
    this.text = text || '';
  }

  createDOMElement() {
    const newText = document.createElement('p');
    newText.textContent = this.text;
    newText.className = 'simple-form simple-form-text';

    const textContainer = document.createElement('div');
    textContainer.className = 'simple-form simple-form-text-container';

    textContainer.appendChild(newText);
    
    return textContainer;
  }
}

class Dropdown {
  constructor(dropdownText, dropdownItems, dropdownIdNumber) {
    this.dropdownText = dropdownText;
    this.dropdownItems = dropdownItems;
    this.dropdownIdNumber = dropdownIdNumber;
    this.dropdownPick = null;
  }

  dropdownPickItem(itemPick) {
    event.preventDefault();
    this.dropdownPick = itemPick;
    console.log(this);
  }

  dropdownButtonOnClick() {
    event.preventDefault();

    const dropdownDiv = document.getElementById(`simple-form-dropdown-button-${this.dropdownIdNumber}`);
    // const dropdownContent = 

    
    console.log('Here');
  }

  createDOMElement() {
    const dropdownDiv = document.createElement('div');
    dropdownDiv.className = 'simple-form simple-form-dropdown-container';
    dropdownDiv.id = `simple-form-dropdown-button-${this.dropdownIdNumber}`;

    const dropdownButton = document.createElement('button');
    dropdownButton.onclick = () => { this.dropdownButtonOnClick(); };

    dropdownButton.textContent = this.dropdownText;
    
    const object = this;
    const dropdownContentDiv = document.createElement('div');
    dropdownContentDiv.className = 'simple-form simple-form-dropdown-content-container';

    const dropdownContent = this.dropdownItems.reduce(function(content, item) {
      const itemAnchor = document.createElement('a');
      itemAnchor.href = '#';
      itemAnchor.textContent = item;
      itemAnchor.onclick = () => { object.dropdownPickItem(item) };
      content.appendChild(itemAnchor);
      return content;
    }, dropdownContentDiv);

    dropdownDiv.appendChild(dropdownButton);
    dropdownDiv.appendChild(dropdownContent);

    return dropdownDiv;
  }
}

function createForm(formName) {
  const newForm = new Form(formName);
  return newForm;
}

// Dropdown

