(function ImageLoader() {
    var images = [];
    var APP_KEY = "qMgTURpDZUZXbS8OyDfvICSCMS5YkkpuMn9vIlco";
    var REST_API = "KOWQQ2S9fB5Hx7bNjiv4bskSQrSuZvSniHUpF4Bb";
    $.ajax({
        method: "GET",
        headers: {
            "X-Parse-Application-Id": APP_KEY,
            "X-Parse-REST-API-Key": REST_API
        },
        url: "https://api.parse.com/1/classes/MoonImages",
        success: imagesLoaded,
        error: throwError
    });
    function imagesLoaded(data) {

        for (var c in data.results) {
            var object = data.results[c].Images.url;
            images.push(object);

        }
        var cDate = timeDate();
        console.log(cDate);
        var mPhase = calcMPhase(cDate);
        var img = $("<img id='phase'>");
        img.attr('src', images[mPhase]);
        img.appendTo("#sub-left");
        
        
    };
	function throwError() {
        alert("Oops! Something goes wrong with loading the moon images.")
    };

}());
