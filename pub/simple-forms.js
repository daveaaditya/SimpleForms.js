class Form {
  constructor(formName) {
    this.formName = formName;
    this.formElements = [];
    this.id = '';
    this.dropdownIdNumber = 0;
  }

  addInputArea(type, inputAreaPlaceholder, labelValue, validator, validationMessage) {
    const newInputArea = new InputTextArea(type, inputAreaPlaceholder, labelValue, validator, validationMessage);
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

  addGrouping(grouping) {
    this.formElements.push(grouping);
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
      // const formInputs = form.querySelectorAll('div');
      const formInputs = form.querySelector('form').childNodes;

      const formValues = [];
      formInputs.forEach(function(element, index) {
        const containerClassList = element.classList;
        if (containerClassList.contains('simple-form-input-container')) {
          const inputText = element.querySelector('input');
          formValues.push(inputText.value);
        } else if (containerClassList.contains('simple-form-checkbox-container')) {
          const checkbox = element.querySelector('input');
          formValues.push(checkbox.checked);
        } else if (containerClassList.contains('simple-form-number-container')) {
          const numberPicker = element.querySelector('input');
          formValues.push(numberPicker.value);
        } else if (containerClassList.contains('simple-form-dropdown-container')) {
          formValues.push(this.formElements[index].dropdownPick);
        } else if (containerClassList.contains('simple-form-grouping')) {
          formValues.push(this.formElements[index].getGroupingData(element));
        }
      }, this);

      console.log(formValues);
      return formValues;
    }
  }
}

class InputTextArea {
  constructor(type, inputAreaPlaceholder, labelValue, validator, validationMessage) {
    this.type = type || 'text';
    this.placeholder = inputAreaPlaceholder || '';
    this.labelValue = labelValue || '';
    this.validator = validator || null;
    this.validationMessage = validationMessage || '';
  }

  validateText() {
    const inputArea = event.target;
    const inputText = inputArea.value + String.fromCharCode(event.which);
    
    if (this.validator === null) {
      return;
    }

    if (!this.validator.test(inputText)) {
      inputArea.classList.add('red-bd');
    } else {
      inputArea.classList.remove('red-bd');
    }
  }

  createDOMElement() {
    const newInputArea = document.createElement('input');
    
    newInputArea.type = this.type;
    newInputArea.placeholder = this.placeholder;
  
    newInputArea.className = `simple-form simple-form-input-area-${this.type}`
    
    newInputArea.addEventListener('keydown', () => { this.validateText() });

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
    checkBoxContainer.className = 'simple-form simple-form-checkbox-container';

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
    inputAreaContainer.className = 'simple-form simple-form-number-container';

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
    this.opened = false;
  }

  dropdownPickItem(itemPick) {
    event.preventDefault();
    this.dropdownPick = itemPick;
    
    const dropdownContent = document.getElementById(`simple-form-dropdown-content-${this.dropdownIdNumber}`);
    const dropdownButton = document.getElementById(`simple-form-dropdown-button-${this.dropdownIdNumber}`);
    dropdownButton.textContent = itemPick;
    
    this.dropdownButtonOnClick();
  }

  dropdownButtonOnClick() {
    event.preventDefault();

    const dropdownDiv = document.getElementById(`simple-form-dropdown-container-${this.dropdownIdNumber}`);
    const dropdownButton = document.getElementById(`simple-form-dropdown-button-${this.dropdownIdNumber}`);
    const dropdownContent = document.getElementById(`simple-form-dropdown-content-${this.dropdownIdNumber}`);

    if (this.opened) {
      dropdownContent.classList.remove('show');
      dropdownContent.classList.add('hide');
      this.opened = false;
    } else {
      dropdownContent.classList.remove('hide');
      dropdownContent.classList.add('show');
      this.opened = true;
    }
  }

  dropdownButtonClickOff(dropdownIdNumber) {
    event.preventDefault();

    const dropdownDiv = document.getElementById(`simple-form-dropdown-container-${dropdownIdNumber}`);
    const dropdownButton = document.getElementById(`simple-form-dropdown-button-${dropdownIdNumber}`);
    const dropdownContent = document.getElementById(`simple-form-dropdown-content-${dropdownIdNumber}`);
    const elementClicked = document.elementFromPoint(event.clientX, event.clientY);

    // if (elementClicked !== dropdownDiv && 
    //     elementClicked !== dropdownButton &&
    //     elementClicked !== dropdownContent) {
    //   dropdownContent.classList.remove('show');
    //   dropdownContent.classList.add('hide');
    // }
    
    if (elementClicked !== dropdownButton) {
      dropdownContent.classList.remove('show');
      dropdownContent.classList.add('hide');
      this.opened = false;
    }
  }

  createDOMElement() {
    const dropdownDiv = document.createElement('div');
    dropdownDiv.className = 'simple-form simple-form-dropdown-container';
    dropdownDiv.id = `simple-form-dropdown-container-${this.dropdownIdNumber}`;

    const dropdownButton = document.createElement('button');
    dropdownButton.onclick = () => { this.dropdownButtonOnClick(); };
    dropdownButton.className = 'simple-form simple-form-dropdown-button';
    dropdownButton.id = `simple-form-dropdown-button-${this.dropdownIdNumber}`
    dropdownButton.textContent = this.dropdownText;

    dropdownButton.addEventListener('click', () => this.dropdownButtonClickOff(this.dropdownIdNumber));
    
    const object = this;
    const dropdownContentDiv = document.createElement('div');
    dropdownContentDiv.className = 'simple-form simple-form-dropdown-content-container hide';
    dropdownContentDiv.id = `simple-form-dropdown-content-${this.dropdownIdNumber}`;

    const dropdownContent = this.dropdownItems.reduce(function(content, item) {
      const itemAnchor = document.createElement('a');
      itemAnchor.href = '#';
      itemAnchor.textContent = item;
      itemAnchor.className = 'simple-form simple-form-dropdown-item';
      itemAnchor.onclick = () => { object.dropdownPickItem(item) };
      content.appendChild(itemAnchor);
      return content;
    }, dropdownContentDiv);

    dropdownDiv.appendChild(dropdownButton);
    dropdownDiv.appendChild(dropdownContent);

    return dropdownDiv;
  }
}

class Grouping extends Form {
  constructor(groupingName) {
    super(groupingName);
  }

  createDOMElement() {
    const groupingContainer = document.createElement('div'); 
    groupingContainer.className = 'simple-form simple-form-grouping';

    const grouping = this.formElements.reduce(function (currentForm, formItem) {
      if (formItem.constructor.name === 'SubmitButton') {
        currentForm.appendChild(formItem.createDOMElement(currentForm));
      } else {
        currentForm.appendChild(formItem.createDOMElement());
      }

      return currentForm;
    }, groupingContainer);

    return grouping;
  }

  getGroupingData(grouping) {
    // const groupingInputs = grouping.querySelectorAll('div');
    const groupingInputs = grouping.childNodes;

    const groupValues = [];
    groupingInputs.forEach(function(element, index) {
      const containerClassList = element.classList;
      if (containerClassList.contains('simple-form-input-container')) {
        const inputText = element.querySelector('input');
        groupValues.push(inputText.value);
      } else if (containerClassList.contains('simple-form-checkbox-container')) {
        const checkbox = element.querySelector('input');
        groupValues.push(checkbox.checked);
      } else if (containerClassList.contains('simple-form-number-container')) {
        const numberPicker = element.querySelector('input');
        groupValues.push(numberPicker.value);
      } else if (containerClassList.contains('simple-form-dropdown-container')) {
        groupValues.push(this.formElements[index].dropdownPick);
      } else if (containerClassList.contains('simple-form-grouping')) {
        groupValues.push(this.formElements[index].getGroupingData(element));
      }
    }, this)

    return groupValues;
  }
}

function createForm(formName) {
  const newForm = new Form(formName);
  return newForm;
}

function createGrouping(groupingName) {
  const newGrouping = new Grouping(groupingName);
  return newGrouping;
}
