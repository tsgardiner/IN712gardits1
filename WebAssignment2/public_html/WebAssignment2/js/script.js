

$(document).ready(function()
{
    //Jquery onload
    //Not sure what onload stuff is needed yet
    var btnSubmit = document.getElementById("btn-estimate");
    
    
    btnSubmit.addEventListener("click", OnButtonClick);
});


//Globals
var taxValue;

function OnButtonClick(event)
{
    event.preventDefault();
    GetTaxJSONData();
    var output = document.getElementById("results");
    output.innerHTML = "<p>" + taxValue + "</p>";
    
}


function MethodCalls()
{
    //Not sure if needed but would conditionally call each function in the steps
    //Acts like a main driver function
}






function GetTaxJSONData(){
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
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


function CalculateTotalBottles()
{
    
}


function CalculateTotalShippingCost()
{
    
}


function CalculateTotalCost()
{
    
}
    
    
function Animation()
{
    
}