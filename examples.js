const newForm = createForm('New Form');
newForm.addCheckBox('Checkbox', 'right');
newForm.addInputArea('email', 'Username', 'Email');
newForm.addInputArea('password', 'Enter Password here', 'Password');
newForm.addNumberPicker('Pick a number');
newForm.addSubmitButton('Submit', function(e) {
  e.preventDefault();
  console.log(newForm.getFormData());
});
newForm.buildForm('hello');