

$(document).ready(function () {
    //Jquery onload
    //Not sure what onload stuff is needed yet
    var btnSubmit = document.getElementById("btn-estimate");


    btnSubmit.addEventListener("click", OnButtonClick);
});


//Globals
var taxValue;
var totalBottles;
var totalPrice = 0;

function OnButtonClick(event)
{
    event.preventDefault();
    GetTaxJSONData();

    var output = document.getElementById("results");
    var costDisplay = document.getElementById("txt-estimate");
    costDisplay.output = '$' + totalPrice;
    output.innerHTML = "<p>" + totalPrice + "</p>";

}


function MethodCalls()
{
    //Not sure if needed but would conditionally call each function in the steps
    //Acts like a main driver function
}






function GetTaxJSONData() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
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
    var currentSum = 0;
    $('.order').find('input, select, textarea').each(function () {
        sum += +$(this).val();
        currentSum = $(this).val();
        CalculateBottleCost($(this).attr('id'), currentSum);
    });    
    
    totalBottles = sum;
});


function CalculateTotalShippingCost()
{

}


function CalculateBottleCost(id, sum)
{
   
    if (id === "txt-q-extra") {
        var price = 0;
        price += sum * 10;
        totalPrice = totalPrice + price;
        console.log(sum);
        console.log(price);
        }
    if (id === "txt-q-cold") {
        var price = 0;
        price += sum * 8;
        totalPrice = totalPrice + price;
        console.log(sum);
        console.log(price);        
    }
    if (id  === "txt-q-garlic") {
        var price = 0;
        price += sum * 10;
        totalPrice = totalPrice + price;
        console.log(sum);
        console.log(price);
    }
    if (id  === "txt-q-lemon") {
        var price = 0;
        price += sum * 12;
        totalPrice = totalPrice + price;
        console.log(sum);
        console.log(price);
    }
}


function Animation()
{

}