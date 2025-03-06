$(document).ready(function () {

    initGUI();

    clickButtonSearchWheather();

    SearchWheather();










});



function initGUI() {
    showScreen("homeScreen")

}

function clickButtonSearchWheather() {
    $("#btn-wheather").on("click", function () {
        showScreen("wheather")
    })

}

function SearchWheather() {
    $("#wheather-search").on("click", function () {
        $("#wheather-infos").text("")
        let city = $("#city").val().trim()
        if (city === "") {
            console.log("rrrr")
            return;
        }



        let API_KEY = "d1406c60145f4bc98b5204434250603";
        let url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=fr`;
        $.getJSON(url)
        .done(function (data) {
            // Créer une carte pour chaque information météo
            $("<div>").addClass("card mb-3").append(
                $("<div>").addClass("card-body").append(
                    $("<h5>").addClass("card-title").text("Informations Météo")
                )
            ).appendTo("#wheather-infos");

            $("<div>").addClass("row").append(
                $("<div>").addClass("col-12 col-md-6").append(
                    $("<h6>").text("Pays :").addClass("font-weight-bold"),
                    $("<p>").text(data.location.country)
                ),
                $("<div>").addClass("col-12 col-md-6").append(
                    $("<h6>").text("Région :").addClass("font-weight-bold"),
                    $("<p>").text(data.location.region)
                ),
                $("<div>").addClass("col-12 col-md-6").append(
                    $("<h6>").text("Ville :").addClass("font-weight-bold"),
                    $("<p>").text(data.location.name).attr("id",data.location.name)
                ),
                $("<div>").addClass("col-12 col-md-6").append(
                    $("<h6>").text("Heure :").addClass("font-weight-bold"),
                    $("<p>").text(data.location.localtime)
                ),
                $("<div>").addClass("col-12 col-md-6").append(
                    $("<h6>").text("Température :").addClass("font-weight-bold"),
                    $("<p>").text(data.current.temp_c + "°C")
                ),
                $("<div>").addClass("col-12 col-md-6").append(
                    $("<h6>").text("Précipitations :").addClass("font-weight-bold"),
                    $("<p>").text(data.current.precip_mm + " mm")
                )
            ).appendTo("#wheather-infos");

            // Ajouter l'icône de la condition météo
            $("<div>").addClass("text-center mb-3").append(
                $("<img>").attr("src",  data.current.condition.icon)
                          .addClass("img-fluid")
            ).appendTo("#wheather-infos");

            // Ajouter la description de la condition
            $("<div>").addClass("text-center").append(
                $("<p>").addClass("font-weight-bold").text(data.current.condition.text)
            ).appendTo("#wheather-infos");



            }).fail(function () {

            })
    })
}


function showScreen(idScreen) {
    $(".appScreen").hide()
    $("#" + idScreen).show()
}      