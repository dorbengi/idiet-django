//
// ADD NEW MEAL 
//
function addNewMeal() {

    // validate if input field is empty
    // if (document.getElementById('ingredient-1').value === '') {
    //     // alert about it
    //     alert('insert ingerdient/s')
    //     return
    // }

    // create meal's properties

    var d = new Date();
    var type = "breakfast";
    var c = 0;
    var ingre = getIngredients().slice();
    var id = mealsCounter + 1;


    for (i = 0; i < ingre.length; i++) {
        c += ingre[i].calValue;
    }


    // create a meal obj and set his properties
    var meal = {
        mealId: id,
        type: type,
        date: d,
        calories: c,
        ingredients: ingre
    };

    // insert meal into meals array
    meals.push(meal);

    // restart fields to defualt state
    var inputFieldsContainer = document.getElementById('add-meal-fields-container');
    inputFieldsContainer.innerHTML = "";

    window.location.href = "meals.html";
    mealsCounter++;

}

//
// ADD NEW MEAL 
//
function showAddPanel() {

    var content = document.getElementById('add-meal-fields-container');
    var footer = document.getElementById('add-meal-buttons-container');

    if (content.style.display !== "flex") {
        content.style.display = "flex";
        footer.style.display = "flex";
    } else {
        content.style.display = "none";
        footer.style.display = "none";
    }

}

//
// DELETE MEAL 
//
function deleteMeal(id) {

    console.log(id);

    // iterate meals arr and search for meal id
    for (i = 0; i < meals.length; i++) {
        if (meals[i].mealId === id) {
            // delete meal from meals arr
            meals.splice(i, 1);
        }
    }

    displayLMeals();

};





//
//  GET INGERDIENTS
//
//  Get all meal's ingerdients from the input fields
//  insert and store data in meal's ingerdients arr
//
function getIngredients() {

    var inputFieldsContainer = document.getElementById('add-meal-fields-container');
    var numOfFields = inputFieldsContainer.childElementCount;
    var ingredients = [];
    var ingredient = {};

    for (i = 0; i < numOfFields; i++) {
        var id = i + 1;
        var field = document.getElementById("ingredient-" + id);
        // add ingredient into ingredients array
        if (field.value !== '') {
            ingredient = {
                name: field.value,
                calValue: 0
            }
        }

        ingredients.push(ingredient);

    }

    return ingredients;

}







//
// MEALS 
//
var meals = [{
        mealId: 1,
        type: "breakfast",
        date: new Date(2020, 10, 24, 10),
        calories: 150,
        ingredients: [{ name: "apple", value: 69 }, { name: "banana", value: 69 }]
    },
    {
        mealId: 2,
        type: "dinner",
        date: new Date(2020, 10, 24, 10),
        calories: 80220,
        ingredients: [{ name: "apple", value: 69 }]
    },
    {
        mealId: 3,
        type: "breakfast",
        date: new Date(2020, 10, 23, 10),
        calories: 337,
        ingredients: [{ name: "apple", value: 69 }]
    },
    {
        mealId: 4,
        type: "lunch",
        date: new Date(2020, 10, 23, 10),
        calories: 300,
        ingredients: [{ name: "apple", value: 69 }]
    },
    {
        mealId: 5,
        type: "dinner",
        date: new Date(2020, 10, 23, 10),
        calories: 150,
        ingredients: [{ name: "apple", value: 69 }]
    },
    {
        mealId: 6,
        type: "breakfast",
        date: new Date(2020, 10, 22, 10),
        calories: 800,
        ingredients: [{ name: "apple", value: 69 }]
    },
    {
        mealId: 7,
        type: "lunch",
        date: new Date(2020, 10, 22, 10),
        calories: 337,
        ingredients: [{ name: "apple", value: 69 }]
    },
    {
        mealId: 8,
        type: "breakfast",
        date: new Date(2020, 10, 22),
        calories: 300,
        ingredients: [{ name: "apple", value: 69 }]
    },
    {
        mealId: 9,
        type: "breakfast",
        date: new Date(2020, 10, 21),
        calories: 300,
        ingredients: [{ name: "apple", value: 69 }]
    },
    {
        mealId: 10,
        type: "breakfast",
        date: new Date(2020, 10, 21),
        calories: 300,
        ingredients: [{ name: "apple", value: 69 }]
    }
];

var mealsCounter = meals.length; // use for ganerate id for futured meals


// DISPLAY LAST MELAS //

// display the last user meals in dashboard

function displayLMeals() {

    // get view
    var view = document.getElementById('meals-view');
    // get cards container
    var row = document.getElementById('meals-cards-container');
    // get card
    var card = document.getElementById('meals-card');



    var date = new Date(0, 0, 0);



    // the first child uses just for clone 
    // remove it from view
    row.innerHTML = '';

    // iterate meals array
    for (i = 0; i < meals.length; i++) {

        // dipaly dates header - once for every date
        if (date.getDate() !== meals[i].date.getDate()) {
            var header = document.createElement('h3');
            header.innerHTML = meals[i].date.getDate() + "/" +
                meals[i].date.getMonth() + "/" +
                meals[i].date.getFullYear();
            date = meals[i].date;
            row.appendChild(header);
        }

        // set date format for display
        if (meals[i].date.getDate() !== new Date().getDate()) {
            // if meal wasn't added today
            var dateformat = meals[i].date.getDate() + "/" +
                meals[i].date.getMonth() + 1 + "/" +
                meals[i].date.getFullYear();
        } else {
            // if meal was added today 
            var dateformat = "Today at " +
                meals[i].date.getHours() + ":" +
                meals[i].date.getMinutes();
        }

        // remove old classes
        card.classList.remove('breakfast-meals');
        card.classList.remove('lunch-meals');
        card.classList.remove('dinner-meals');

        if (meals[i].type === 'dinner')
            card.classList.add('dinner-meals');

        else if (meals[i].type === 'breakfast')
            card.classList.add('breakfast-meals');

        else
            card.classList.add('lunch-meals');

        // clone card 
        var d = card.cloneNode(true);
        // get card header
        var cardHeader = d.getElementsByClassName('card-header')[0];
        cardHeader.innerHTML = '';
        // get card body
        var cardBody = d.getElementsByClassName('card-body')[0];
        cardBody.innerHTML = '';
        // create container for displaying meal date
        var mealdate = document.createElement('div');
        // create container for displaying meal calories
        var mealcalories = document.createElement('div');
        // create container for displaying meal ingredients
        var mealingredients = document.createElement('div');
        // inject date value 
        mealdate.innerHTML = meals[i].type;
        // append date container into card body
        cardBody.appendChild(mealdate);
        // inject calories value into calories container 
        mealcalories.innerHTML = meals[i].calories;
        // append calories container into card body
        cardBody.appendChild(mealcalories);
        // inject ingredients value 
        mealingredients.innerHTML = meals[i].ingredients[0].name;
        // append ingredients container into card body
        cardBody.appendChild(mealingredients);
        row.appendChild(d);

        // add "DELETE" icon
        var btnDelete = document.createElement("i"); // create btn
        btnDelete.setAttribute("class", "fas");
        btnDelete.classList.add("fa-trash-alt"); // set btn class
        btnDelete.setAttribute("onclick", "deleteMeal(" + meals[i].mealId + ")"); // set btn on click, inject id

        // add "DISPLAY" icon
        var btnEdit = document.createElement("i"); // create btn
        btnEdit.setAttribute("class", "far");
        btnEdit.classList.add("fa-eye"); // set btn class
        btnEdit.setAttribute("onclick", "viewMeal(" + meals[i].mealId + ")");

        cardHeader.appendChild(btnEdit);
        cardHeader.appendChild(btnDelete);
    }

    // inject meals into the view
    view.innerHTML = row.outerHTML;

}

function viewMeal(id) {

    var view = document.getElementById('meals-view');
    var displayMeal = document.getElementById('display-meal');

    var meal;

    for (i = 0; i < meals.length; i++) {
        if (id === meals[i].mealId) {
            meal = meals[i];
        }
    }

    var dateformat = meal.date.getDate() + "/" +
        meal.date.getMonth() + 1 + "/" +
        meal.date.getFullYear();

    document.getElementById('view-meal-id').innerHTML = meal.mealId;
    document.getElementById('view-meal-type').innerHTML = meal.type;
    document.getElementById('view-meal-date').innerHTML = dateformat;
    var ingre = '';
    for (i = 0; i < meal.ingredients.length; i++) {

        ingre += " " + meal.ingredients[i].name;

    }
    document.getElementById('view-meal-ingredients').innerHTML = ingre;

    view.innerHTML = displayMeal.outerHTML;
}