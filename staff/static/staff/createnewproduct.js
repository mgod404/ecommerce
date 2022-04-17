let optionsObj = {};

const generateOptions = async () => {
    const category = document.getElementById('mockupCategoryId').value;
    const response = await fetch(`http://127.0.0.1:8000/api/options/${category}/`);
    const jsonres = await response.json()
    const options = await jsonres.options

    let inputDiv = document.getElementById('optionInputsDiv');
    inputDiv.innerHTML = '';


    Object.entries(options).forEach(([key,value]) => {
        inputDiv = document.getElementById('optionInputsDiv');
        let inputGroup = document.createElement('div');
        inputGroup.setAttribute('class', 'input-group mb-3');

        let newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('class', 'form-control');
        newInput.setAttribute('id',`${key}_option`);
        newInput.setAttribute('placeholder',`${key}`);
        newInput.setAttribute('onchange', 'updateOptionsInput(this)');
        inputGroup.appendChild(newInput);

        let span = document.createElement('span');
        span.setAttribute('class', 'input-group-text');
        span.setAttribute('id', `${key}_option_span`);
        span.innerText = value;
        inputGroup.appendChild(span);

        inputDiv.appendChild(inputGroup);
    });
    let optionsFormInput = document.getElementById('id_options');
    optionsFormInput.innerText = JSON.stringify(options);
}

const updateOptionsInput = () => {
    //To be honest this function wasn't meant to work 
    //as it does right now. At the beginning user had to 
    //push a button to transfer data from inputs to the form, 
    //but since setting it as onchange attribute works as well,
    //I just decided to leave it as it is.
    optionsObj = {};

    let optionsInputGroups = document.getElementById('optionInputsDiv').children;
    for(inputGroup of optionsInputGroups){
        let inputGroupChildren = inputGroup.children;
        optionsObj[inputGroupChildren[0].placeholder] = `${inputGroupChildren[0].value}${inputGroupChildren[1].innerText}`;
    }
    let optionsFormInput = document.getElementById('id_options');
    optionsFormInput.innerText = JSON.stringify(optionsObj);

    //Check if all inputs for options are filled.
    //If they are, let user use form submit button.
    let allInputsFilled = true;
    for(inputGroup of optionsInputGroups){
        let inputGroupChildren = inputGroup.children;
        if(!inputGroupChildren[0].value){
            allInputsFilled = false;
        }
    }
    if(allInputsFilled){
        let warning = document.getElementById('warningField');
        let submitButton = document.getElementById('formSubmitBttn');
        warning.innerText = '';
        submitButton.disabled = false;
    }
}


const updateCategory = () => {
    let categoryInput = document.getElementById('id_category');
    categoryInput.value = document.getElementById('mockupCategoryId').value;
}