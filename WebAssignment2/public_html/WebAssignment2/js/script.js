

$(document).ready(function () {
    var btnSubmit = document.getElementById("btn-estimate");
    btnSubmit.addEventListener("click", OnButtonClick);
});


//Globals
var taxValue;
var totalBottles;
var totalPrice;


function OnButtonClick(event)
{
    event.preventDefault();
    GetTaxJSONData();

    var output = document.getElementById("results");
    document.getElementById("txt-estimate").value = "$ " + (totalPrice * taxValue);
    output.innerHTML = "<p>" + totalBottles + "</p>";

}


function MethodCalls()
{
    //Not sure if needed but would conditionally call each function in the steps
    //Acts like a main driver function
}






function GetTaxJSONData() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var states = JSON.parse(request.responseText);
            var currentState = document.getElementById("s-state").value;
            taxValue = states[currentState];
        }
    };
    var taxJsonUrl = "https://dl.dropboxusercontent.com/u/10089854/Web3/Assignment2/stateTaxInfo.json";
    request.open("GET", taxJsonUrl, true);
    request.send();
}


function CheckShippingState()
{
    //Change focus to unentered area
}


function CheckEmail()
{
    //Change focus to email area
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
        var count =  $(this).val();
        
        if (id === "txt-q-extra") {
        price += (count * 10);
        }
        if (id === "txt-q-cold") {
        price += (count * 8);
        }
        if (id  === "txt-q-garlic") {
            price += (count * 10);
        }
        if (id  === "txt-q-lemon") {
            price += (count * 12);
        }
    });    
    totalPrice = price;
    totalBottles = sum;
});


function CalculateTotalShippingCost()
{

}


function CalculateBottleCost()
{
    
}


function Animation()
{

}