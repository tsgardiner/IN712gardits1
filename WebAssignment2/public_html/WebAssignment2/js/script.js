

//Globals
var taxValue;
var totalBottles;
var shippingCost = 0; //The default freight cost is $0
var totalPrice;
var shippingCostBottles;



$(document).ready(function () {
    
    var btnSubmit = document.getElementById("btn-estimate");
    btnSubmit.addEventListener("click", OnButtonClick);
});



function OnButtonClick(event)
{
    event.preventDefault();
    GetTaxJSONData();
    CheckEmail();
    

}


function MethodCalls()
{
    //Not sure if needed but would conditionally call each function in the steps
    //Acts like a main driver function
}


function Display() {
    CalculateTotalShippingCost();
    var output = document.getElementById("results");
    document.getElementById("txt-estimate").value = "$ " + (totalPrice + (totalPrice * taxValue) + shippingCostBottles);
    output.innerHTML = "<p>" + shippingCostBottles + "</p>";
    console.log(shippingCostBottles);
    console.log(shippingCost);
}



function GetTaxJSONData() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var states = JSON.parse(request.responseText);
            var currentState = document.getElementById("s-state").value;
            taxValue = states[currentState];
            Display();
        }
    };
    var taxJsonUrl = "https://dl.dropboxusercontent.com/u/10089854/Web3/Assignment2/stateTaxInfo.json";
    request.open("GET", taxJsonUrl, true);
    request.send();
}


function CheckEmail()
{
    var email = document.getElementById("email").value;
    if (validateEmail(email)) {

    }
}


function EstimateTotal()
{
    //Event handler
}


//On change of the text input elements in the form the number of total bottles is updated.
//Also check attribute by id and adds the price of that ammount of bottles to the totalPrice.
$(document).on("change", $('.order').find('input, select, textarea'), function () {
    var sum = 0;
    var price = 0;
    $('.order').find('input, select, textarea').each(function () {
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
    totalPrice = price;
    totalBottles = sum;
});


//On change of selected raido button add the correct shipping cost depeding on what is selected.
$('input:radio[name=r_method]').change(function() {
        if (this.value === 'pickup') {
           shippingCost = 0;
        }
        else if (this.value === 'usps') {
            shippingCost = 2;
        }
        else if (this.value === 'ups') {
            shippingCost = 3;
        }
    });
    
    
function CalculateTotalShippingCost()
{
    if (shippingCost !== 0) {
        shippingCostBottles = (totalBottles * shippingCost);
    }   else {
        shippingCostBottles = shippingCost;
    }     
    
}

function validateEmail(elementValue){        
   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
   return emailPattern.test(elementValue);   
 }   


function Animation()
{

}