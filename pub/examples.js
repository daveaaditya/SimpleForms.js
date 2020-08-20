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

styles = {
  theme: {
    primary: 'grey',
    secondary: 'white'
  },
  form: {
    borderSize: '2px',
    borderRadius: '20px',
    borderColour: 'black'
  },
  text: {
    textColour: 'white',
  }
}

newForm.buildForm('login-form', styles);

const MC = createForm('MC');
const MCGroup = createGrouping('MC Group');

MCGroup.addText('What is 3 + 3?');
MCGroup.addCheckbox('4', 'right');
MCGroup.addCheckbox('6', 'right');
MCGroup.addCheckbox('3', 'right');
MCGroup.addCheckbox('5', 'right');
MC.addGrouping(MCGroup);

MC.addSubmitButton('Check answer', function(e) {
  e.preventDefault();
  const MCSubmission = MC.getFormData();
  if (MCSubmission[0][0] === false &&
      MCSubmission[0][1] === true &&
      MCSubmission[0][2] === false &&
      MCSubmission[0][3] === false) {
    MC.addStyle('green-bd');
  } else {
    MC.addStyle('red-bd');
  }
});
MC.buildForm('multiple-choice');
