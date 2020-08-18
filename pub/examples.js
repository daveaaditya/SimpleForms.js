const newForm = createForm('New Form');
let loggedIn = false;
newForm.addInputArea('text', 'Name', 'Enter your name here', RegExp('test'));
newForm.addInputArea('email', 'Username', 'Email');
newForm.addInputArea('password', 'Enter Password here', 'Password');
newForm.addDropdown('test dropdown', ['one', 'two', 'three', 'Heeeeeeeeeeeeeellllloooooooooo']);
newForm.addSubmitButton('Submit', function(e) {
  e.preventDefault();
  const formData = newForm.getFormData()

  if (formData[0] === 'User' &&
      formData[1] === 'user@email.com' &&
      formData[2] === 'user-test') {
    if (loggedIn === true) return;
    loggedIn = true;
    const successText = document.createElement('h1');
    successText.textContent = 'You logged in!';
    successText.className = 'success-text';
    const successTextContainer = document.querySelector('#success-button');
    successTextContainer.appendChild(successText);
  } else {
    if (!loggedIn) return;
    loggedIn = false;
    const successTextContainer = document.querySelector('#success-button');
    const successText = successTextContainer.querySelector('h1');
    successTextContainer.removeChild(successText);
  }
});
newForm.buildForm('login-form');

const MC = createForm('MC');
MC.addText('What is 3 + 3?');
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
