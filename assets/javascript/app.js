function showGifs() {

    // prevents the submit button from submitting a form and refreshing the entry
    // showGifs.preventDefault();

    // console.log('yo');

    var gifButton = $(this).attr("data-name")

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rM0DgW7jZ67BhNWEoArOyaQV5wA6zvPN&q=" + gifButton + "&limit=10&offset=0&rating=PG&lang=en"


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

            var gifURL = response.data[i].images.fixed_height_still.url;
            var gif = $("<img>").attr("src", gifURL).attr("data-id", i).attr("data-name", gifButton).attr("data-animation",'still').addClass("gifName").attr("id", i);

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

$(document).on('click', ".gif-button", showGifs)
createButtons();