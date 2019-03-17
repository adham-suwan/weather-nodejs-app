//This is a client-side Javascript file



//calling api from client-side javascript
fetch ("http://puzzle.mead.io/puzzle").then(function(response){ //callback function after response
    response.json().then(function(data){
        console.log(data);
    });
});



const weatherForm = document.querySelector("form");
const searchInput = document.querySelector ("input");
const messageOne = document.querySelector ("#message-1")
const messageTwo = document.querySelector ("#message-2")

weatherForm.addEventListener("submit", function(event){

    event.preventDefault(); //preventDefault in event callback function, because we don't want the page to be refreshed after form submit (the default behavior)
    
    var locationValue = searchInput.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch("/weather?address="+locationValue).then(function(response){
    response.json().then(function(data){
        if (data.error){
            messageOne.textContent = data.error;
            messageTwo.textContent = "";
        }
        else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast.degrees + " degrees. " + data.forecast.summary + " Rain change is " + data.forecast.rainProb + ". Wind speed is " + data.forecast.windSpeed;
        }
    });
});
});