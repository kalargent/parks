    // Array for parks 
    var nationalParks = [
        
    ]; 

    // Var for Zip Code 
    var zipcode = ""; 

    // Vars for query URL 
    // api key
    // var stateCode = $("#stateSearch").val(); 
    //query URL 
    // var parkQueryURL = "https://developer.nps.gov/api/v1/parks?" + stateCode + "&limit=10&api_key=TUzbrDxmdtDfjNLGofmsOXAmQ6WPMwukeORXBBHm"; 
    

    // parkFetcher();
    // initMap(); 
    
    $("#fetchParkState").on("click", function (){ 
        parkFetcher(); 
        console.log("state search"); 
    })

    function parkFetcher () { 
        console.log("parkFetcher");

        var stateCode = $(".searchTerm").val(); 
        console.log(stateCode + "state code"); 
        //query URL 
        var parkQueryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateCode + "&limit=10&api_key=TUzbrDxmdtDfjNLGofmsOXAmQ6WPMwukeORXBBHm"; 

        $.ajax ({
            url:parkQueryURL, 
            method: "GET"
        })

        .then(function (response){
            var parks = response.data; 
            console.log(parks); 
            nationalParks = []; 

            for (var i = 0; i < parks.length; i++) {
                var currentPark =  parks[i]
                console.log('currentPark',currentPark.latLong)
                if(currentPark.latLong === ''){
                    i++;
                }else {
                    var splitValue = currentPark.latLong.split(", ");
                    var lat = splitValue[0].split(":")[1];
                    var long = splitValue[1].split(":")[1];
                    nationalParks.push({
                        name:currentPark.fullName,
                        type:currentPark.designation,
                        lat,
                        long,
                        url:currentPark.url,
                        parkCode:currentPark.parkCode
                    });
                }
                    console.log(nationalParks);
            }
           
        })      
        .then(populateSearchResults)
    }

    function populateSearchResults () {
        console.log(nationalParks,'nationalParks');
        $(".searchResults > tbody").empty();
        console.log("clearedlist"); 
        nationalParks.forEach(function(nationalPark){
            var newRow = $("<tr>").append (
                    $("<td>").html('<input type="checkbox" id="parkSelect-'+nationalPark.parkCode+'"/>'),
                    $("<td>").text(nationalPark.name),
                    $("<td>").text(nationalPark.type),
                    $("<td>").text(nationalPark.url)
                );
                console.log("adding"); 
             $(".searchResults > tbody").append(newRow)
        })
    };

      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
        // $("#map").html(map); 
      }
    

    
