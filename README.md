# card-details
This is my solution to the interactive card details form problem on frontendmentor.io. I made it using React. It features basic form validation checks, ternary operators, and state management.

The form verification comes in two ways - there are error management states (the states that end with Error) and the built in input parameters. The error management states trigger the rendering of an error message that corresponds to a specific issue with the variable that is tied to user input. This issue can be either a blank field or incorrect format. 

This is achieved by using ternary statements:
{cardholderNameError ? <div className='error-message card-name-error'>Can't be blank</div> : ''}

When the form is submitted, the onSubmit function checks whether or not the input field is empty. If the input field is empty it will set the corresponding field error state to true, otherwise it will be set to false.

if (!cardholderName) {setCardholderNameError(true)} else {setCardholderNameError(false)};

Each input field is checked.

If the form passes validation, the form is submitted and the values for each state is reset to blank, the error states are reset to false, and setCompleteVisible is set to true. This triggers the rerendering of the form-container div. When completeVisible is true, the page will render a div containing a message indicating that the form has been successfully submitted. Clicking continue on this message will then set the completeVisible state to false, and the form-container will rerender showing the form again. 

There is a mobile layout featured as well.