function validate(e)
{
    hideAllErrors();

    if(formHasErrors())
    {
        e.preventDefault();
        return false;
    }

    alert("An E-mail with a demo link will be sent to you shortly!");
    return true;
}

function formHasErrors()
{
    let errorFlag = false;
    let requiredFields = ["name", "cell", "mail", "discover"];

    for(let i = 0; i < requiredFields.length; i++)
    {
        let textField = document.getElementById(requiredFields[i]);

        if(!formFieldHasInput(textField))
        {
            document.getElementById(requiredFields[i] + "_error").style.display = "block";

            if(requiredFields[i] != "discover")
            {
                document.getElementById(requiredFields[i]).style.borderBottom = "2px solid red";
            }
            else
            {
                document.getElementById(requiredFields[i]).style.border ="2px solid red";
            }

            if(!errorFlag)
            {
                textField.focus();
                textField.select();
            }

            errorFlag = true;
        }
    }

    let regexFields = ["cell", "mail"];

    let cellRegex = new RegExp(/^\d{10}$/);
    let mailRegex = new RegExp(/.+\@.+\..+/);

    let regExpArr = [cellRegex, mailRegex]

    for(let i = 0; i < regexFields.length; i++)
    {
        let textField = document.getElementById(regexFields[i]);

        if(!regExpArr[i].test(textField.value))
        {
            document.getElementById(regexFields[i] + "_error").style.display = "block";  
            textField.style.borderBottom = "2px solid red";

            console.log(regexFields[i] + " test failed");
            
            if(!errorFlag)
            {
                textField.focus();
                textField.select();
            }

            errorFlag = true;
        }
    }

    return errorFlag;
}

function trim(str) 
{
  return str.replace(/^\s+|\s+$/g, "");
}

function formFieldHasInput(fieldElement)
{
    if(fieldElement.value == null || trim(fieldElement.value) == "")
    {
        return false;
    }

    return true;
}

function resetForm(e)
{
    if(confirm("Clear demo form?"))
    {
        hideAllErrors();

        document.getElementById("name").focus();

        return true;
    }

    e.preventDefault();

    return false;
}

function hideAllErrors()
{
    let formFields = ["name", "cell", "mail", "discover"];
    
    for(let i = 0; i < formFields.length; i++)
    {
        document.getElementById(formFields[i] + "_error").style.display = "none";
        document.getElementById(formFields[i]).style.borderBottom = "2px solid var(--blue)";

        if(formFields[i] == "discover")
        {
            document.getElementById(formFields[i]).style.border = "2px solid var(--blue)";           
        }
    }
}

function load()
{
    document.getElementById("register-form").addEventListener("submit", validate);

    document.getElementById("register-form").addEventListener("reset", resetForm);
}

document.addEventListener("DOMContentLoaded", load);