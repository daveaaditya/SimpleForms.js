const loginFormStyles = {
  form: {
    borderRadius: '8px',
  },
  text: {
    textSize: '16px'
  },
  inputArea: {
    borderRadius: '16px',
    inputHeight: '40px'
  },
  button: {
    backgroundColour: '#0b57bb',
    borderColour: 'black'
  }
}

const loginForm = createForm('Login');
let loggedIn = false;
loginForm.addInputArea('text', 'Name', 'Enter your name');
loginForm.addInputArea('email', 'Email', 'Email');
loginForm.addInputArea('password', 'Password', 'Password', 
                       RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"));
loginForm.addDropdown('User Type', ['User', 'Admin']);
loginForm.addSubmitButton('LOGIN', function(e) {
  e.preventDefault();
  const formData = loginForm.getFormData()
  console.log(formData);
  if (formData[0] === 'User' &&
      formData[1] === 'user@email.com' &&
      formData[2] === 'Test@1234' &&
      formData[3] === 'User') {
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

loginForm.buildForm('light-login', loginFormStyles);


const loginFormDark = createForm('Login Dark');
loginFormDark.addInputArea('text', 'Name', 'Enter your name');
loginFormDark.addInputArea('email', 'Email', 'Email');
loginFormDark.addInputArea('password', 'Password', 'Password', 
                           RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"));
loginFormDark.addDropdown('User Type', ['User', 'Admin']);
loginFormDark.addSubmitButton('LOGIN', function(e) {
  e.preventDefault();
});

const loginFormDarkStyles = {
  form: {
    backgroundColour: '#181a1b',
    borderRadius: '8px',
  },
  text: {
    textSize: '16px',
    textColour: 'white'
  },
  button: {
    backgroundColour: '#0b57bb',
    borderColour: 'white'
  },
  inputArea: {
    borderRadius: '16px',
    inputHeight: '40px',
    borderColour: 'white',
    backgroundColour: '#181a1b'
  },
  dropdown: {
    backgroundColour: '#8395a7',
    itemHoverColour: 'black',
    itemHoverTextColour: 'white'
  }
}

loginFormDark.buildForm('dark-login', loginFormDarkStyles);


MCStyles = {
  form: {
    borderRadius: '20px',
  },
  checkbox: {
    height: '24px',
    width: '24px',
    borderRadius: '4px',
  },
  text: {
    textSize: '16px',
    textColour: 'black',
  },
}

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
    MC.addClass('green-bd');
    MC.removeClass('red-bd');
  } else {
    MC.removeClass('green-bd');
    MC.addClass('red-bd');
  }
});
MC.buildForm('multiple-choice', MCStyles);