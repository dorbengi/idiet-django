console.log(mealsCounter)

//
//
//
function initPage() {

    // display meal id
    var fieldId = document.getElementById('create-meal-input-field-id');
    // set id value
    fieldId.value = mealsCounter + 1;

}

//
//  Add ingredients input field 
//
//  
//
function addInputForIngredients() {

    // get input FIELDSSSSSSSSS! container
    var inputFieldsContainer = document.getElementById('add-meal-fields-container');
    var numOfFields = inputFieldsContainer.childElementCount;
    var mealid = numOfFields + 1;


    var lChild = inputFieldsContainer.lastElementChild;

    // get FIELD! container

    var fieldcontainer = document.createElement('div');
    fieldcontainer.setAttribute('class', 'col-xl-6');
    // clone it
    var newfield = document.createElement('input');
    newfield.setAttribute('id', 'ingredient-' + mealid);
    newfield.setAttribute('class', 'form-control');
    newfield.setAttribute('onkeydown', 'addInputForIngredients()');

    // remove onkeydown event from previous fiels
    lChild.lastElementChild.removeAttribute("onkeydown");
    // append new input node

    fieldcontainer.appendChild(newfield);
    inputFieldsContainer.appendChild(fieldcontainer);

}

initPage();