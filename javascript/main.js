//Get the user input


document.querySelector(".js-go").addEventListener('click', function() {
	var inputValue = document.querySelector('.js-userinput').value;
		var userInput = getUserInput();
	sGiphy( userInput );

});

document.querySelector('.js-userinput').addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
 		var userInput = getUserInput();
 		sGiphy( userInput );
    }
});

function getUserInput() {
	var inputValue = document.querySelector('.js-userinput').value;

	return inputValue;
}


//Use the API to do stuffs


function sGiphy( searchQuery ) {
	var url = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + searchQuery;

	// AJAX Request
	var GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open( 'GET', url );
	GiphyAJAXCall.send();


	GiphyAJAXCall.addEventListener('load', function( data ) {

			var actualData = data.target.response;
			pushToDOM(actualData);
			console.log(actualData);
		
	});

}


//Display the GIFs

function pushToDOM( response ) {
	// turn response into real javascript object
	response = JSON.parse( response );
	// drill down to the data array
	var imageURL = response.data;

	// find the container to hold this stuff in DOM
	var container = document.querySelector('.js-container');
	// Reset the div cause the same function will be used over and over again for the searches
	container.innerHTML = "";

	// loop through data array and add IMG html
	imageURL.forEach(function(image){
		// find img src
		var src = image.images.fixed_height.url;

		// concatenate a new IMG tag
		container.innerHTML += "<img src='"+ src +"' class='js-container' />";
	});
}