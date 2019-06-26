function showGifs() {

    // prevents the submit button from submitting a form and refreshing the entry
    // showGifs.preventDefault();

    // console.log('yo');

    var gifButton = $(this).attr("data-name")

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rM0DgW7jZ67BhNWEoArOyaQV5wA6zvPN&q=" + gifButton + "&limit=10&offset=0&rating=PG13&lang=en"


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // $("#gif-area").text(JSON.stringify(response));

        var numberOfGifs = 10

        for (var i = 0; i < numberOfGifs; i++) {
            var data = response.data[i]

            console.log(data);

            var gifDiv = $("<div class='gif'>");

            var rating = response.data[i].rating;
            var pOne = $("<p>").text("Rating: " + rating);
            gifDiv.append(pOne);

            var gifURL = response.data[i].images.fixed_height.url;
            // create an image tag and give the attr method for 
            var gif = $("<img>").attr("src", gifURL).attr("data-id", i).attr("data-name", gifButton).attr("data-animation", 'animate').addClass("gifName").attr("id", i);

            gifDiv.append(gif);

            $("#gif-area").prepend(gifDiv);

        }
    });
};

var presetGifs = ["Tiger Woods", "Joel Embiid", "Puppies"];

function createButtons() {
    $("#button-area").empty();

    // create and show the buttons of the preset Gif array
    for (var i = 0; i < presetGifs.length; i++) {

        var button = $("<button>");
        button.addClass('gif-button');
        button.attr("data-name", presetGifs[i]);
        button.text(presetGifs[i]);
        $("#button-area").append(button);
    }
}

$("#find-gif").on("click", function (event) {
    event.preventDefault();

    var gif = $("#gif-input").val().trim();

    // Taking the newly inputted info to create a string and push it into the preset Gifs
    // array so it will get pushed onto the page like the rest of the preset gifs
    presetGifs.push(gif);
    createButtons();
})


// trying to create a function to make it so when you click on the Gif, it will become animated or still and back and forth
// having some trouble, might not use it all and just make it animated when it opens
function animate () {
    // identifying variables to pull data from each gif and then be able to animate and make it still
    var id = $(this).attr("data-id");
    var name = $(this).attr("data-name");
    var animation = $(this).attr("data-animation");

    var gifButton = name;
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rM0DgW7jZ67BhNWEoArOyaQV5wA6zvPN&q=" + gifButton + "&limit=10&offset=0&rating=PG13&lang=en"
    var stillGif;
    var animateGif;
    var arrGif = [];

    $ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        stillGif = response.data[id].images.fixed_height_still.url;
        gifAnimate = response.data[id].images.fixed_height.url;
        if (animation === "still") {
            $("#"+id).attr("src", animateGif);
            $("#"+id).attr("data-animation", "animate");
        }
        else {
            $("#"+id).attr("src", stillGif);
            $("#"+id).attr("data-animation", "still");
        }
    });
    
}

$(document).on('click', ".gif-button", showGifs);
$(document).on('click', '.gifName', animate);
createButtons();