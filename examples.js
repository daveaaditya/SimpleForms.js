const newForm = createForm();
addCheckBox(newForm, 'checkbox');
addInputArea(newForm, 'email', 'Username', 'Email');
addInputArea(newForm, 'password', 'Enter password here', 'Password');
addInputArea(newForm, 'number');
addFormToPage('hello', newForm);
// console.log(newForm);