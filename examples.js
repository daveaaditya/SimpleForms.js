const newForm = createForm();
addCheckBox(newForm, 'checkbox');
addInputArea(newForm, 'email', 'Username', 'Email');
addInputArea(newForm, 'password', 'Enter password here', 'Password');
addNumberPicker(newForm, 'number');
addSubmitButton(newForm, 'Submit', function(e) {
  e.preventDefault();
  console.log('Got here.');
});
addFormToPage('hello', newForm);