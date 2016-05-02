

//Globals
var taxValue;
var totalBottles;
var shippingCost = 0; //The default freight cost is $0
var totalBottlePrice;
var shippingCostBottles;
var mainCanvas;
var mainContext;
var posX = 0;



//Once the document has fully loaded creates an event listener for the form button.
$(document).ready(function () {
    var btnSubmit = document.getElementById("btn-estimate");
    btnSubmit.addEventListener("click", OnButtonClick);
});


//Button clicked function
function OnButtonClick(event)
{
    event.preventDefault();
    Run();
}


function Run()
{
    if (CheckState()) {
        if (CheckEmail()) {
            GetTaxJSONData();            
        }
    }
}


//Displays order information
function Display(state) {    
    CalculateTotalShippingCost();
    Draw();
    
    var output = document.getElementById("results");
    var totalCost = (totalBottlePrice + (totalBottlePrice * taxValue) + shippingCostBottles);
    
    output.innerHTML = "";  //Clear screen
    
    document.getElementById("txt-estimate").value = "$ " + totalCost ;
    output.innerHTML += "<p> Total bottles: "+ totalBottles + "</p>";
    output.innerHTML += "<p> Total shipping: $" + shippingCostBottles + ".00</p>";
    output.innerHTML += "<p> Tax: " + (taxValue * 100) + ".00%  ("+ state + ") </p>";
    
    CreateLocalDetails(state);
}


//Gets tax rate based on selected state and calls the Display function when completed.
function GetTaxJSONData() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var states = JSON.parse(request.responseText);
            var currentState = document.getElementById("s-state").value;
            taxValue = states[currentState];
            Display(currentState);
        }
    };
    var taxJsonUrl = "https://dl.dropboxusercontent.com/u/10089854/Web3/Assignment2/stateTaxInfo.json";
    request.open("GET", taxJsonUrl, true);
    request.send();
}


//Checks if a state has been selected. Returns true if correct.
function CheckState()
{
    var currentState = document.getElementById("s-state").value;
    if (currentState === "") {
        alert("Please select your state.");
        document.getElementById("s-state").focus();
    } else {
        return true;
    }
}


//Checks and validated email. Returns true if correct.
function CheckEmail()
{
    var email = document.getElementById("email").value;
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        document.getElementById("email").focus();
    } else {
        return true;
    }
}
function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
}


//On change of the text input elements in the form the number of total bottles is updated.
//Also check attribute by id and adds the price of that ammount of bottles to the totalPrice.
$(document).on("change", $('.order').find('input[type=text]'), function () {
    var sum = 0;
    var price = 0;
    $('.order').find('input[type=text]').each(function () {
            sum += +$(this).val();

            var id = $(this).attr('id');
            var count = $(this).val();

            if (id === "txt-q-extra") {
                price += (count * 10);
            }
            if (id === "txt-q-cold") {
                price += (count * 8);
           }
            if (id === "txt-q-garlic") {
                price += (count * 10);
            }
            if (id === "txt-q-lemon") {
                price += (count * 12);
            }
    
    });
    totalBottlePrice = price;
    totalBottles = sum;
});


//On change of selected raido button add the correct shipping cost depeding on what is selected.
$('input:radio[name=r_method]').change(function () {
    if (this.value === 'pickup') {
        shippingCost = 0;
    } else if (this.value === 'usps') {
        shippingCost = 2;
    } else if (this.value === 'ups') {
        shippingCost = 3;
    }
});


//Calculated the shipping cost per bottle if necessary.
function CalculateTotalShippingCost()
{
    if (shippingCost !== 0) {
        shippingCostBottles = (totalBottles * shippingCost);
    } else {
        shippingCostBottles = shippingCost;
    }
}


//Draw and animate functions for the shipping image
function Draw(){    
    mainCanvas = document.getElementById("myCanvas");
    mainContext = mainCanvas.getContext("2d");
    setInterval(Animate, 10);    
}
function Animate(){   
    
    var img = new Image();
    img.src = "images/packageShipment.png";
    
   if (posX <= 220){               
        mainContext.clearRect(0,0, 200, 200);
        mainContext.drawImage(img, posX, 0);
        posX ++;            
   } else {
       posX = 0;
   }          
}

//Create Json object in local storage.
function CreateLocalDetails(currentState) {
    var details = { purchaseDetails : [ 
            { bottlesOrdered : totalBottles }, 
            { state : currentState }]};
    var json = JSON.stringify(details);
    localStorage.setItem("purchaseDetails", json);
}


