 $("#map").attr("hidden", "false");

 $("#button").on("click", function() {
     var queryURL = "http://api.open-notify.org/iss-now.json"
     var queryLat = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
     $.ajax({
             url: queryURL,
             method: "GET"
         })
         .done(function(response) {
             var curLat = response.iss_position.latitude;
             var curLon = response.iss_position.longitude;
             var timeStamp = moment.unix(response.timestamp).format("MM/DD/YYYY");
             $.ajax({
                     url: queryLat + curLat + ',' + curLon,
                     method: "GET"
                 })
                 .done(function(response) {
                     tryURL = queryLat + curLat + ',' + curLon;
                     console.log(tryURL);
                 });
             $("#text").html("<div class=" + "panel panel-default" + "><div class=" + "panel-body" + "id=" + "text" + "><h2 class=" + "text-center" + ">The ISS is currently at <span id=" + "latitude" + "></span> degrees latitude and <span id=" + "longitude" + "></span> degrees longitude as of <span id=" + "timestamp" + "></h2></span></div></div>");
             $("#latitude").text(curLat);
             $("#longitude").text(curLon);
             $("#timestamp").text(timeStamp);
         });
 });

 $("#locationSearchSubmit").on("click", function() {
     userNoURI = $("#locationSearch").val();
     if (!userNoURI) {
      alert("Please enter a valid location knucklehead");
     }
     else {
       userInput = encodeURI($("#locationSearch").val());
       userURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + userInput + "&key=%20AIzaSyDlKkxy7ExYhv5v5oxDtBBOXlPjouE-lyE";
       var userLat, userLon;
       $.ajax({
               url: userURL,
               method: "GET"
           })
           .done(function(response) {
               userLat = response.results[0].geometry.location.lat;
               userLon = response.results[0].geometry.location.lng;
               console.log(userLat);
               console.log(userLon);
               getISSPassTime(userLat, userLon);
           });
           
       function getISSPassTime(userLat, userLon) {
           userCoordinateURL = "http://api.open-notify.org/iss-pass.json?lat=" + userLat + "&lon=" + userLon;
           $.ajax({
                   url: userCoordinateURL,
                   method: "GET",
                   dataType: "jsonp"
               })
               .done(function(response) {
                   var passTime = moment.unix(response.response[0].risetime).format("MM/DD/YYYY HH:MM:SS");
                   $("#passText").html("<div class=" + "panel panel-default" + "><div class=" + "panel-body" + "id=" + "text" + "><h2 class = " + "text-center" + ">The International Space Station will be above <span id=" + "userLocation" + "></span> at <span id=" + "passTime" + "></span></h2></span></div></div>");
                   $("#userLocation").text(userNoURI);
                   $("#passTime").text(passTime);
               });
       }
   }
 });
 initMap();

 function initMap() {
     var uluru = { lat: -25.363, lng: 131.044 };
     var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 4,
         center: uluru
     });
     var marker = new google.maps.Marker({
         position: uluru,
         map: map
     });
 }
