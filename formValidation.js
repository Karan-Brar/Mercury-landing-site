/******w*************
    
    Project 3 Javascript
    Name: Karanvir Singh Brar
    Date: 2022-04-21
    Description: JavaScript file (Form Validation) for project 3

********************/

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the submit event
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) 
{
  // Hides all error elements on the page
  hideAllErrors();

  // Determine if the form has errors
  if (formHasErrors()) 
  {
    e.preventDefault();
    return false;
  }

  // Sending alert to user that form has been submitted
  alert("An E-mail with a demo link will be sent to you shortly!");
  return true;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() 
{
  let errorFlag = false;
  let requiredFields = ["name", "cell", "mail", "discover"];

  // Checking for any empty fields
  for (let i = 0; i < requiredFields.length; i++) 
  {
    let textField = document.getElementById(requiredFields[i]);

    if (!formFieldHasInput(textField)) 
    {
      document.getElementById(requiredFields[i] + "_error").style.display =
        "block";

      if (requiredFields[i] != "discover") 
      {
        document.getElementById(requiredFields[i]).style.borderBottom =
          "2px solid red";
      } 
      else 
      {
        document.getElementById(requiredFields[i]).style.border =
          "2px solid red";
      }

      if (!errorFlag) 
      {
        textField.focus();
        textField.select();
      }

      errorFlag = true;
    }
  }

  let regexFields = ["cell", "mail"];

  // Creating RegEx objects
  let cellRegex = new RegExp(/^\d{10}$/);
  let mailRegex = new RegExp(/.+\@.+\..+/);

  let regExpArr = [cellRegex, mailRegex];

  // Testing fields against RegEx objects
  for (let i = 0; i < regexFields.length; i++) 
  {
    let textField = document.getElementById(regexFields[i]);

    if (!regExpArr[i].test(textField.value)) 
    {
      document.getElementById(regexFields[i] + "_error").style.display =
        "block";
      textField.style.borderBottom = "2px solid red";

      console.log(regexFields[i] + " test failed");

      if (!errorFlag) 
      {
        textField.focus();
        textField.select();
      }

      errorFlag = true;
    }

  }

  return errorFlag;
}

/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
  // Uses a regex to remove spaces from a string.
  return str.replace(/^\s+|\s+$/g, "");
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) 
{
  // Check if the text field has a value
  if (fieldElement.value == null || trim(fieldElement.value) == "") 
  {
    return false;
  }

  return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e A reference to the reset event
 * return  True allows the reset to happen; False prevents
 *         the browser from resetting the form.
 */
function resetForm(e) 
{
  // Confirm if user wants to clear demo form  
  if (confirm("Clear request demo form?")) 
  {  
    hideAllErrors();

    document.getElementById("name").focus();

    return true;
  }

  e.preventDefault();

  return false;
}

/*
 * Resets (hides) all of the error messages on the page.
 */
function hideAllErrors() 
{
  let formFields = ["name", "cell", "mail", "discover"];

  // Iterate through all form fields and restting error styles
  for (let i = 0; i < formFields.length; i++) 
  {
    document.getElementById(formFields[i] + "_error").style.display = "none";
    document.getElementById(formFields[i]).style.borderBottom =
      "2px solid var(--blue)";

    if (formFields[i] == "discover") 
    {
      document.getElementById(formFields[i]).style.border =
        "2px solid var(--blue)";
    }
  }

}

/**
 * Handles the load event of the document.
 */
function load() 
{
  // Adding event listener for form submission
  document.getElementById("register-form").addEventListener("submit", validate);

  // Adding event listener for form resetting
  document.getElementById("register-form").addEventListener("reset", resetForm);
}

// Add
document.addEventListener("DOMContentLoaded", load);
