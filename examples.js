const newForm = createForm();
addCheckBox(newForm, 'checkbox', 'right');
addInputArea(newForm, 'email', 'Username', 'Email');
addInputArea(newForm, 'password', 'Enter password here', 'Password');
addNumberPicker(newForm, 'number');
addSubmitButton(newForm, 'Submit', function(e) {
  e.preventDefault();
});
addFormToPage('hello', newForm);