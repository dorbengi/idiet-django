var privateName = "ploni"; //
var lastName = "almoni";
var height = 188;
var weight = 75;
var gender = "male";
var age = 30;
var exerciseLevelValue = 0; //
var caloriesPerDay = 0; //
var caloriesCurrentValue = 0; //
var goal = 0;
var kilogramPerWeek = 0.70;
var caloriesPerDayGoal = 0;


var goals = [
    "stay at the same weight",
    "add a weight",
    "lose a weight"
];

var exerciseLevels = [{
        key: "little or no exercise",
        value: 1.2
    },
    {
        key: "",
        value: 1.374
    },
    {
        key: "",
        value: 1.465
    },
    {
        key: "",
        value: 1.549
    },
    {
        key: "",
        value: 1.9
    },
];


//
//
//
function calculateBmaCaloriesPerDay() {

    if (gender === "male")
        caloriesPerDay = (10 * weight + 6.25 * height - 5 * age + 5) * exerciseLevels[exerciseLevelValue].value;
    else
        caloriesPerDay = (10 * weight + 6.25 * height - 5 * age - 161) * exerciseLevels[exerciseLevelValue].value;

}

//
//
//
function calculateUserCaloriesPerDay() {

    if (goals[goal] === "stay at the same weight")
        caloriesPerDayGoal = Math.round(caloriesPerDay * 1.2);
    else if (goals[goal] === "add a weight")
        caloriesPerDayGoal = Math.round(caloriesPerDay + (kilogramPerWeek * 10 * 100));
    else
        caloriesPerDayGoal = Math.round(caloriesPerDay - (kilogramPerWeek * 10 * 100));
}

//
//
//
function initializeUserData() {

    var username = document.getElementById('user-name');
    var userweight = document.getElementById('user-weight');
    var userheight = document.getElementById('user-height');
    var usergender = document.getElementById('user-gender');
    var userage = document.getElementById('user-age');
    var userExerciselvl = document.getElementById('user-exercises-level');

    var userCaloriesPerday = document.getElementById('user-calories-per-day');

    var usergoal = document.getElementById('user-goal');
    var usergoalkilo = document.getElementById('user-goal-kilo');

    var userCaloriesPerdayGoal = document.getElementById('user-calories-per-day-goal');

    userweight.innerHTML = weight;
    userheight.innerHTML = height;
    usergender.innerHTML = gender;
    userage.innerHTML = age;
    userExerciselvl.innerHTML = exerciseLevels[exerciseLevelValue].key;

    userCaloriesPerday.innerHTML = caloriesPerDay;

    usergoal.innerHTML = goals[goal];
    usergoalkilo.innerHTML = kilogramPerWeek;

    userCaloriesPerdayGoal.innerHTML = caloriesPerDayGoal;
}


function getData() {

    var param = document.getElementsByClassName('search-field')[0].value
    var request = new XMLHttpRequest()

    request.open('GET', "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=QnxYFcv6xXdAZgjOhet16jlyt7dfkuJZha0HKo1Z&query=" + param, true)

    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {

            var foodNutrientsJson = data.foods[0].foodNutrients;
            var foodNutrients = "";
            var t = "";

            for (i = 0; i < data.foods.length; i++) {
                t += data.foods[i].description + "</br>";
            }

            for (i = 0; i < foodNutrientsJson.length; i++) {
                foodNutrients += foodNutrientsJson[i].nutrientName +
                    " : " + foodNutrientsJson[i].value + "</br>";
            }


            var resultContainer = document.createElement('div');
            var result = document.createElement('div');
            var resultBtn = document.createElement('button');
            result.setAttribute('class', 'nurtrients-result');
            resultBtn.setAttribute('class', 'btn-primary');
            resultBtn.setAttribute('onclick', 'initPage()');
            resultBtn.classList.add('btn');
            resultBtn.classList.add('nurtrients-result-btn');
            result.innerHTML = foodNutrients;
            resultContainer.appendChild(result);
            resultBtn.innerHTML = "Back";
            resultContainer.appendChild(resultBtn);


            document.getElementById('dashboard-view').innerHTML = resultContainer.outerHTML;



        } else {
            console.log('error')
        }
    }

    request.send()


}


// DISPLAY LAST MELAS //

// display the last user meals in dashboard

function dispalayLastMeals() {

    // get cards container
    var row = document.getElementById('dashboard-card-container');
    // get card
    var card = document.getElementById('dashboard-card');

    // the first child uses just for clone 
    // remove it from view
    row.innerHTML = '';

    // iterate meals array
    for (i = 0; i < meals.length; i++) {

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


        card.classList.remove('breakfast');
        card.classList.remove('lunch');
        card.classList.remove('dinner');

        if (meals[i].type === 'dinner')
            card.classList.add('dinner');

        else if (meals[i].type === 'breakfast')
            card.classList.add('breakfast');

        else
            card.classList.add('lunch');



        // clone card 
        var d = card.cloneNode(true);
        // get card body
        var cardBody = d.getElementsByClassName('card-body')[0];
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
        mealingredients.innerHTML = dateformat;
        // append ingredients container into card body
        cardBody.appendChild(mealingredients);
        row.appendChild(d);

    }

}


// INITIALIZE PAGE //

function initPage() {

    // lunch last meal panel


    // get dashboard panel
    var dashboard = document.getElementsByClassName('dummy-div')[0];
    // inject dasboard panel into the view panel
    document.getElementById('dashboard-view').innerHTML = dashboard.innerHTML;
}

dispalayLastMeals();
calculateBmaCaloriesPerDay();
calculateUserCaloriesPerDay();
initPage();