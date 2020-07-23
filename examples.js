const newForm = createForm();
// addStyle(newForm, 'red');
addFormToPage('hello', newForm);
addInputArea(newForm, 'checkbox');
addInputArea(newForm, 'email', 'Username', 'Email');
addInputArea(newForm, 'password', 'Enter password here');
addInputArea(newForm, 'number');
// console.log(newForm);