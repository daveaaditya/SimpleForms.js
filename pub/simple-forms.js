(function(global) {
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
  
    addClass(style) {
      if (!!this.id) {
        const formElement = document.querySelector(`#${this.id}`).querySelector('form');
        formElement.classList.add(`${style}`);
      }
    }
  
    removeClass(style) {
      if (!!this.id) {
        const formElement = document.querySelector(`#${this.id}`).querySelector('form');
        formElement.classList.remove(`${style}`);
      }
    }
    
    addStyles(form, styles) {
      if (!styles || !styles.text || !styles.form) {
        return form;
      }
  
      form.style.backgroundColor = styles.form.backgroundColour;
      form.style.borderWidth = styles.form.borderSize;
      form.style.borderRadius = styles.form.borderRadius;
      form.style.margin = styles.form.margin;
      form.style.padding = styles.form.padding;
      form.style.borderColor = styles.form.borderColour;
      form.style.color = styles.text.textColour;
      form.style.fontSize = styles.text.textSize;
  
      return form;
    }
    
    createDOMElement(styles) {
      const form = document.createElement('form');
      form.className = 'simple-form simple-form-container';
  
      const styledForm = this.addStyles(form, styles);
  
      return styledForm;
    }
  
  
    buildForm(id, styles) {
      const form = this.createDOMElement(styles);
      this.id = id;
      
      const completeForm = this.formElements.reduce(function (currentForm, formItem) {
        if (formItem.constructor.name === 'SubmitButton') {
          currentForm.appendChild(formItem.createDOMElement(currentForm, styles));
        } else {
          currentForm.appendChild(formItem.createDOMElement(styles));
        }
  
        return currentForm;
      }, form);
  
      document.querySelector(`#${id}`).appendChild(completeForm);
    }
  
    getFormData() {
      if (!!this.id) {
        const form = document.querySelector(`#${this.id}`);
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
      const inputText = inputArea.value + event.key;
      if (this.validator === null) {
        return;
      }
  
      if (!this.validator.test(inputText)) {
        inputArea.classList.add('red-bd');
      } else {
        inputArea.classList.remove('red-bd');
      }
    }
  
    addStyles(input, styles) {
      if (!styles || !styles.text || !styles.inputArea) {
        return input;
      }
  
      input.style.color = styles.text.textColour;
      input.style.fontSize = styles.text.textSize;
      input.style.padding = styles.inputArea.padding;
      input.style.margin = styles.inputArea.margin;
  
      const inputField = input.querySelector('input');
      
      inputField.style.borderWidth = styles.inputArea.borderSize;
      inputField.style.height = styles.inputArea.inputHeight;
      inputField.style.borderRadius = styles.inputArea.borderRadius;
      inputField.style.borderColor = styles.inputArea.borderColour;
      inputField.style.backgroundColor = styles.inputArea.backgroundColour;
      inputField.style.color = styles.text.textColour;
  
      return input;
    }
  
    createDOMElement(styles) {
      const newInputArea = document.createElement('input');
      
      newInputArea.type = this.type;
      newInputArea.placeholder = this.placeholder;
    
      newInputArea.className = `simple-form simple-form-input-area-${this.type}`;
      
      newInputArea.addEventListener('keypress', () => { this.validateText() });
  
      let labelInputArea;
      if (!!this.labelValue) {
        labelInputArea = document.createElement('label');
        labelInputArea.className = 'simple-form simple-form-input-label';
        labelInputArea.textContent = this.labelValue;
      }
    
      const inputAreaContainer = document.createElement('div');
      inputAreaContainer.className = 'simple-form simple-form-input-container';
    
      if (!!labelInputArea) inputAreaContainer.appendChild(labelInputArea)
      inputAreaContainer.appendChild(newInputArea);
  
      const styledInputAreaContainer = this.addStyles(inputAreaContainer, styles);
  
      return styledInputAreaContainer;
    }
  }
  
  class Checkbox {
    constructor(labelValue, labelSide) {
      this.labelValue = labelValue || '';
      this.labelSide = labelSide || 'left';
    }
  
    addStyles(checkbox, styles) {
      if (!styles || !styles.text || !styles.checkbox) {
        return checkbox;
      }
  
      checkbox.style.fontSize = styles.text.textSize;
      checkbox.style.color = styles.text.textColour;
      checkbox.style.padding = styles.checkbox.padding;
      checkbox.style.margin = styles.checkbox.margin;
  
      const checkboxInput = checkbox.querySelector('input');
  
      checkboxInput.style.height = styles.checkbox.height;
      checkboxInput.style.width = styles.checkbox.width;
      checkboxInput.style.borderWidth = styles.checkbox.borderSize;
      checkboxInput.style.borderRadius = styles.checkbox.borderRadius;
  
      return checkbox;
    }
  
    createDOMElement(styles) {
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
  
      const styledCheckBoxContainer = this.addStyles(checkBoxContainer, styles);
  
      return styledCheckBoxContainer;
    }
  }
  
  class NumberPicker {
    constructor(labelValue) {
      this.labelValue = labelValue || '';
    }
  
    createDOMElement(styles) {
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
  
    addStyles(button, styles) {
      if (!styles || !styles.text || !styles.button) {
        return button;
      }
  
      button.style.margin = styles.button.margin;
      button.style.padding = styles.button.padding;
      button.style.color = styles.text.textColour;
      button.style.fontSize = styles.text.textSize;
  
      const buttonElement = button.querySelector('input');
      buttonElement.style.backgroundColor = styles.button.backgroundColour;
      buttonElement.style.borderWidth = styles.button.borderSize;
      buttonElement.style.borderRadius = styles.button.borderRadius;
      buttonElement.style.borderColor = styles.button.borderColour;
      buttonElement.style.color = styles.text.textColour;
  
      return button;
    }
  
    createDOMElement(form, styles) {
      const newSubmitButton = document.createElement('input');
      newSubmitButton.type = 'submit';
      newSubmitButton.value = this.buttonText || '';
      newSubmitButton.className = 'simple-form simple-form-button';
  
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'simple-form simple-form-button-container';
  
      buttonContainer.appendChild(newSubmitButton);
      form.addEventListener('submit', this.onClickFunction);
  
      const styledButtonContainer = this.addStyles(buttonContainer, styles);
      return styledButtonContainer;
    }
  }
  
  class Text {
    constructor(text) {
      this.text = text || '';
    }
  
    addStyles(text, styles) {
      if (!styles || !styles.text) {
        return text;
      }
  
      text.style.color = styles.text.textColour;
      text.style.fontSize = styles.text.textSize;
      text.style.margin = styles.text.margin;
      text.style.padding = styles.text.padding;
  
      return text;
    }
  
    createDOMElement(styles) {
      const newText = document.createElement('p');
      newText.textContent = this.text;
      newText.className = 'simple-form simple-form-text';
  
      const textContainer = document.createElement('div');
      textContainer.className = 'simple-form simple-form-text-container';
  
      textContainer.appendChild(newText);
  
      const styledText = this.addStyles(textContainer);
      
      return styledText;
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
  
    addStyles(dropdown, styles) {
      if (!styles || !styles.text || !styles.dropdown) {
        return dropdown;
      }
  
      dropdown.style.color = styles.text.textColour;
      dropdown.style.fontSize = styles.text.textSize;
      dropdown.style.padding = styles.dropdown.padding;
      dropdown.style.margin = styles.dropdown.margin;
  
      const dropdownButton = dropdown.querySelector('button');
      dropdownButton.style.backgroundColor = styles.dropdown.backgroundColour;
      dropdownButton.style.borderWidth = styles.dropdown.buttonBorderSize;
      dropdownButton.style.borderColor = styles.dropdown.buttonBorderColour;
      
      const dropdownItems = dropdown.querySelectorAll('a');
  
      dropdownItems.forEach(function(item) {
        item.style.backgroundColor = styles.dropdown.backgroundColour;
        item.addEventListener('mouseover', () => {
          item.style.backgroundColor = styles.dropdown.itemHoverColour;
          item.style.color = styles.dropdown.itemHoverTextColour;
        })
        item.addEventListener('mouseout', () => {
          item.style.backgroundColor = styles.dropdown.backgroundColour;
          item.style.color = styles.text.textColour;
        });
      }, this);
  
      return dropdown;
    }
  
    dropdownPickItem(itemPick) {
      event.preventDefault();
      this.dropdownPick = itemPick;
      
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
  
      if (elementClicked !== dropdownButton) {
        dropdownContent.classList.remove('show');
        dropdownContent.classList.add('hide');
        this.opened = false;
      }
    }
  
    createDOMElement(styles) {
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
  
      const styledDropdownDiv = this.addStyles(dropdownDiv, styles);
  
      return styledDropdownDiv;
    }
  }
  
  class Grouping extends Form {
    constructor(groupingName) {
      super(groupingName);
    }
  
    createDOMElement(styles) {
      const groupingContainer = document.createElement('div'); 
      groupingContainer.className = 'simple-form simple-form-grouping';
  
      const grouping = this.formElements.reduce(function (currentForm, formItem) {
        if (formItem.constructor.name === 'SubmitButton') {
          currentForm.appendChild(formItem.createDOMElement(currentForm, styles));
        } else {
          currentForm.appendChild(formItem.createDOMElement(styles));
        }
  
        return currentForm;
      }, groupingContainer);
  
      return grouping;
    }
  
    getGroupingData(grouping) {
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

  global.Form = global.Form || Form;
  global.Grouping = global.Form || Grouping;
  global.createForm = global.createForm || createForm;
  global.createGrouping = global.createGrouping || createGrouping;
})(window);



styles = {
  form: {
    backgroundColour: '',
    borderSize: '',
    borderRadius: '',
    borderColour: '',
    margin: '',
    padding: ''
  },
  button: {
    borderSize: '',
    borderRadius: '',
    borderColour: '',
    margin: '',
    padding: '',
    backgroundColour: ''
  },
  inputArea: {
    borderSize: '',
    borderRadius: '',
    borderColour: '',
    padding: '',
    margin: '',
    errorColour: '',
    inputHeight: '',
    backgroundColour: ''
  },
  text: {
    textSize: '',
    textColour: '',
    padding: '',
    margin: '',
  },
  checkbox: {
    height: '',
    width: '',
    borderSize: '',
    borderRadius: '',
    padding: '',
    margin: '',
  },
  dropdown: {
    buttonBorderSize:'',
    buttonBorderColour: '',
    center: '',
    padding: '',
    margin: '',
    backgroundColour: '',
    itemHoverColour: '',
    itemHoverTextColour: ''
  }
}