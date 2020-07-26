const newForm = createForm('New Form');
newForm.addInputArea('text', 'Name', 'Enter your name here');
newForm.addInputArea('email', 'Username', 'Email');
newForm.addInputArea('password', 'Enter Password here', 'Password');
newForm.addSubmitButton('Submit', function(e) {
  e.preventDefault();
  console.log(newForm.getFormData());
});
newForm.buildForm('login-form');

const MC = createForm('MC');
MC.addCheckbox('4', 'right');
MC.addCheckbox('6', 'right');
MC.addCheckbox('3', 'right');
MC.addCheckbox('5', 'right');
MC.addSubmitButton('Check answer', function(e) {
  e.preventDefault();
  const MCSubmission = MC.getFormData();

  if (MCSubmission[0] === false &&
      MCSubmission[1] === true &&
      MCSubmission[2] === false &&
      MCSubmission[3] === false) {
    MC.addStyle('green-bd');
  } else {
    MC.addStyle('red-bd');
  }
});
MC.buildForm('multiple-choice');
